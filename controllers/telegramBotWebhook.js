const TelegramBot = require('node-telegram-bot-api');
const { query } = require('../config/db'); // Import the query function

// Initialize the bot with your token
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(telegramBotToken, { polling: true });

// A map to track users in the middle of providing their email
const waitingForEmail = new Map();

// Listen for the /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id; // Get chat_id
  const username = msg.from.username || 'Not set'; // Get username
  
  console.log(`Received /start command from user: @${username}`);
  console.log(`Chat ID: ${chatId}`);

  try {
    // Prompt the user to enter their email
    bot.sendMessage(chatId, `Welcome @${username}! Please provide your email to continue.`);

    // Add the user to the waiting list for email input
    waitingForEmail.set(chatId, { username, chatId });
  } catch (err) {
    console.error("Error handling /start command:", err);
    bot.sendMessage(chatId, `There was an error registering your information. Please try again later.`);
  }
});

// Listen for any message from users who are currently waiting for their email input
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the user is in the waitingForEmail map
  if (waitingForEmail.has(chatId)) {
    const { username } = waitingForEmail.get(chatId);

    if (text && text.includes('@')) { // Check if the user provided a valid email format
      const email = text.trim();

      // Process the email provided
      try {
        const result = await updateTelegramUser(email, username, chatId);

        if (result === 'already_saved') {
          // Inform the user their Telegram info is already saved
          bot.sendMessage(chatId, `Your Telegram information is already saved for ${email}.`);
          waitingForEmail.delete(chatId);
        } else if (result) {
          // Send a confirmation message to the user
          bot.sendMessage(chatId, `Your email has been saved, and your Telegram information has been updated.`);
          // Remove the user from the waiting list after processing their email
          waitingForEmail.delete(chatId);
        } else {
          bot.sendMessage(chatId, `Hello @${username}! We couldn't find your email in our system. Please check if you're registered.`);
          // Prompt the user to enter the email again
          bot.sendMessage(chatId, "Please provide a valid email address.");
        }
      } catch (error) {
        bot.sendMessage(chatId, `There was an error while saving your email. Please try again later.`);
      }
    } else {
      // Prompt the user again if the message isn't an email
      bot.sendMessage(chatId, "Please provide a valid email address in the format user@example.com.");
    }
  }
});

// Function to check if the user exists and update their details in the database
const updateTelegramUser = async (email, telegramUsername, chatId) => {
  try {
    // Check if the user exists in the database based on email
    const user = await query('SELECT * FROM Users WHERE email = ?', [email]);

    if (user.length > 0) {
      // Check if telegram_username and chat_id are already set
      if (user[0].telegram_username && user[0].chat_id) {
        console.log(`Telegram info already saved for email ${email}`);
        return 'already_saved'; // Indicate that Telegram info is already saved
      }

      // If the user exists but Telegram info is not set, update their telegram_username and chat_id
      const updateQuery = `
        UPDATE Users 
        SET telegram_username = ?, chat_id = ? 
        WHERE email = ?
      `;
      await query(updateQuery, [telegramUsername, chatId, email]);
      console.log(`User with email ${email} updated with telegram_username: ${telegramUsername} and chat_id: ${chatId}`);
      return true; // Return true to indicate the update was successful
    } else {
      console.log("User not found. No update made.");
      return false;
    }
  } catch (err) {
    console.error("Error updating user in database:", err);
    throw new Error("Error updating user in database");
  }
};

// Export the bot instance
module.exports = bot;