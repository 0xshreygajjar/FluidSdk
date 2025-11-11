export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: number; output: number; }
  BigInt: { input: bigint; output: bigint; }
  Bytes: { input: string; output: string; }
};

/**
 * Agent entity from subgraph
 */
export interface Agent {
  id: string;
  chainId: Scalars['BigInt']['output'];
  agentId: Scalars['BigInt']['output'];
  owner: Scalars['Bytes']['output'];
  operators: Scalars['Bytes']['output'][];
  agentURI: string;
  agentURIType?: Maybe<string>;
  createdAt: Scalars['BigInt']['output'];
  updatedAt: Scalars['BigInt']['output'];
  totalFeedback?: Maybe<number>;
  lastActivity?: Maybe<Scalars['BigInt']['output']>;
  registrationFile?: Maybe<AgentRegistrationFile>;
  feedback?: Array<Feedback>;
}

/**
 * Agent Registration File entity from subgraph
 */
export interface AgentRegistrationFile {
  id: string;
  agentId: Scalars['BigInt']['output'];
  name: string;
  description: string;
  image?: Maybe<string>;
  active: boolean;
  x402support: boolean;
  supportedTrusts: string[];
  mcpEndpoint?: Maybe<string>;
  mcpVersion?: Maybe<string>;
  a2aEndpoint?: Maybe<string>;
  a2aVersion?: Maybe<string>;
  ens?: Maybe<string>;
  did?: Maybe<string>;
  agentWallet?: Maybe<Scalars['Bytes']['output']>;
  agentWalletChainId?: Maybe<number>;
  mcpTools: string[];
  mcpPrompts: string[];
  mcpResources: string[];
  a2aSkills: string[];
  createdAt?: Maybe<Scalars['BigInt']['output']>;
}

/**
 * Feedback entity from subgraph
 */
export interface Feedback {
  id: string;
  agent?: Maybe<{ id: string; agentId: Scalars['BigInt']['output']; chainId: Scalars['BigInt']['output'] }>;
  clientAddress: Scalars['Bytes']['output'];
  score: number;
  tag1?: Maybe<string>;
  tag2?: Maybe<string>;
  feedbackUri?: Maybe<string>;
  feedbackURIType?: Maybe<string>;
  feedbackHash?: Maybe<Scalars['Bytes']['output']>;
  isRevoked: boolean;
  createdAt: Scalars['BigInt']['output'];
  revokedAt?: Maybe<Scalars['BigInt']['output']>;
  feedbackFile?: Maybe<FeedbackFile>;
  responses?: Array<FeedbackResponse>;
}

/**
 * Feedback File entity from subgraph
 */
export interface FeedbackFile {
  id: string;
  feedbackId: string;
  text?: Maybe<string>;
  capability?: Maybe<string>;
  name?: Maybe<string>;
  skill?: Maybe<string>;
  task?: Maybe<string>;
  context?: Maybe<string>;
  proofOfPaymentFromAddress?: Maybe<Scalars['Bytes']['output']>;
  proofOfPaymentToAddress?: Maybe<Scalars['Bytes']['output']>;
  proofOfPaymentChainId?: Maybe<number>;
  proofOfPaymentTxHash?: Maybe<Scalars['Bytes']['output']>;
  tag1?: Maybe<string>;
  tag2?: Maybe<string>;
  createdAt?: Maybe<Scalars['BigInt']['output']>;
}

/**
 * Feedback Response entity from subgraph
 */
export interface FeedbackResponse {
  id: string;
  responder: Scalars['Bytes']['output'];
  responseUri?: Maybe<string>;
  responseHash?: Maybe<Scalars['Bytes']['output']>;
  createdAt: Scalars['BigInt']['output'];
}
