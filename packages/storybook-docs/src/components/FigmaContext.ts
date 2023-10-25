import { createContext } from 'react';
import * as Figma from 'figma-js';

const token = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;

interface FigmaClient extends ReturnType<typeof Figma.Client> {
  isConfigured: boolean;
}

export const FigmaContext = createContext<FigmaClient>({
  // eslint-disable-next-line new-cap
  ...Figma.Client({
    personalAccessToken: token,
  }),
  isConfigured: !!token,
});

export default FigmaContext;
