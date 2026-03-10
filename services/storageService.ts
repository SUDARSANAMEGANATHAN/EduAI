

import { User, Document, FlashcardSet, Quiz, Activity, ChatMessage, CommunityMessage } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'ai_learn_current_session',
  DOCS: 'ai_learn_docs',
  SETS: 'ai_learn_sets',
  QUIZZES: 'ai_learn_quizzes',
  ACTIVITY: 'ai_learn_activity',
  CHATS: 'ai_learn_chats',
  COMMUNITY: 'ai_learn_community'
};

export const storageService = {
  getCurrentSession: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentSession: (user: User | null) => {
    if (user) localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getDocuments: (): Document[] => {
    const data = localStorage.getItem(STORAGE_KEYS.DOCS);
    return data ? JSON.parse(data) : [];
  },
  
  saveDocument: (doc: Document) => {
    const docs = storageService.getDocuments();
    docs.push(doc);
    localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(docs));
    storageService.addActivity({
      id: Math.random().toString(36).substr(2, 9),
      type: 'upload',
      description: `Uploaded: ${doc.title}`,
      timestamp: Date.now()
    });
  },

  updateDocument: (id: string, updates: Partial<Document>) => {
    const docs = storageService.getDocuments();
    const index = docs.findIndex(d => d.id === id);
    if (index !== -1) {
      docs[index] = { ...docs[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(docs));
    }
  },

  getFlashcardSets: (): FlashcardSet[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SETS);
    return data ? JSON.parse(data) : [];
  },

  saveFlashcardSet: (set: FlashcardSet) => {
    const sets = storageService.getFlashcardSets();
    sets.push(set);
    localStorage.setItem(STORAGE_KEYS.SETS, JSON.stringify(sets));
    storageService.addActivity({
      id: Math.random().toString(36).substr(2, 9),
      type: 'flashcard',
      description: `Created flashcards: ${set.title}`,
      timestamp: Date.now()
    });
  },

  // Added updateFlashcardSet to fix errors in DocumentDetail.tsx and GlobalFlashcards.tsx
  updateFlashcardSet: (id: string, updates: Partial<FlashcardSet>) => {
    const sets = storageService.getFlashcardSets();
    const index = sets.findIndex(s => s.id === id);
    if (index !== -1) {
      sets[index] = { ...sets[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.SETS, JSON.stringify(sets));
    }
  },

  getQuizzes: (): Quiz[] => {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return data ? JSON.parse(data) : [];
  },

  saveQuiz: (quiz: Quiz) => {
    const quizzes = storageService.getQuizzes();
    quizzes.push(quiz);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  },

  updateQuiz: (id: string, updates: Partial<Quiz>) => {
    const quizzes = storageService.getQuizzes();
    const index = quizzes.findIndex(q => q.id === id);
    if (index !== -1) {
      quizzes[index] = { ...quizzes[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
    }
  },

  getChats: (docId: string): ChatMessage[] => {
    const chats = localStorage.getItem(`${STORAGE_KEYS.CHATS}_${docId}`);
    return chats ? JSON.parse(chats) : [];
  },

  saveChatMessage: (docId: string, message: ChatMessage) => {
    const chats = storageService.getChats(docId);
    chats.push(message);
    localStorage.setItem(`${STORAGE_KEYS.CHATS}_${docId}`, JSON.stringify(chats));
  },

  // Added getCommunityMessages to fix errors in CommunityChat.tsx
  getCommunityMessages: (): CommunityMessage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.COMMUNITY);
    return data ? JSON.parse(data) : [];
  },

  // Added saveCommunityMessage to fix errors in CommunityChat.tsx
  saveCommunityMessage: (message: CommunityMessage) => {
    const messages = storageService.getCommunityMessages();
    messages.push(message);
    // Keep only the last 50 messages to prevent LocalStorage bloat
    localStorage.setItem(STORAGE_KEYS.COMMUNITY, JSON.stringify(messages.slice(-50)));
  },

  getActivities: (): Activity[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    return data ? JSON.parse(data) : [];
  },

  addActivity: (activity: Activity) => {
    const activities = storageService.getActivities();
    activities.unshift(activity);
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activities.slice(0, 10)));
  }
};
