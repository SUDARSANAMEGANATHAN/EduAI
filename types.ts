
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: number;
}

export interface UserAccount extends User {
  passwordHash: string;
}

export interface Document {
  id: string;
  userId: string;
  title: string;
  filePath: string;
  extractedText: string;
  summary?: string;
  createdAt: number;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  isStarred: boolean;
  isReviewed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FlashcardSet {
  id: string;
  documentId: string;
  title: string;
  cards: Flashcard[];
  createdAt: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  documentId: string;
  title: string;
  questions: QuizQuestion[];
  score?: number;
  attemptedAt?: number;
}

export interface Activity {
  id: string;
  type: 'upload' | 'flashcard' | 'quiz' | 'chat' | 'concept';
  description: string;
  timestamp: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface CommunityMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: number;
}
