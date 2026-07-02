
import { Mastra } from '@mastra/core/mastra';
import { MastraCompositeStore } from '@mastra/core/storage';
import { weatherWorkflow } from './workflows/weather-workflow';
import { searchAgent } from './agents/search-agent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { searchAgent },
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    
  }),
  server: {
    
  }
});
