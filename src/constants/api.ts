export const API_CALL_URLS = {
  getChatUsersInfo: (chatId: string) => `/Chats/${chatId}`,
  getChats: '/Chats',
  addMessageEvent: (chatId: string) =>
    `/Chats/AddMessageEvent/?chatId=${chatId}`
}
