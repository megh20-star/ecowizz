'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing smart saving tips to users.
 *
 * The flow uses the user's usage data and external sources to generate personalized tips for conserving resources.
 *
 * @exports {
 *   getSmartSavingTips: (input: SmartSavingTipsInput) => Promise<SmartSavingTipsOutput>;
 *   SmartSavingTipsInput: z.infer<typeof SmartSavingTipsInputSchema>;
 *   SmartSavingTipsOutput: z.infer<typeof SmartSavingTipsOutputSchema>;
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const SmartSavingTipsInputSchema = z.object({
  energyUsage: z.number().describe('The user\'s energy usage in kWh.'),
  waterUsage: z.number().describe('The user\'s water usage in liters.'),
  location: z.string().describe('The user\'s general location (e.g., city, state).'),
});
export type SmartSavingTipsInput = z.infer<typeof SmartSavingTipsInputSchema>;

const SmartSavingTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('An array of personalized saving tips.'),
});
export type SmartSavingTipsOutput = z.infer<typeof SmartSavingTipsOutputSchema>;

export async function getSmartSavingTips(input: SmartSavingTipsInput): Promise<SmartSavingTipsOutput> {
  return smartSavingTipsFlow(input);
}

const smartSavingTipsPrompt = ai.definePrompt({
  name: 'smartSavingTipsPrompt',
  input: {schema: SmartSavingTipsInputSchema},
  output: {schema: SmartSavingTipsOutputSchema},
  prompt: `You are an expert in providing personalized saving tips for energy and water conservation.

  Based on the user's energy usage of {{energyUsage}} kWh, water usage of {{waterUsage}} liters, and location of {{location}},
  provide a list of practical and actionable tips to help them conserve resources.

  Consider local climate, common household appliances, and typical water usage habits in their location.

  The tips should be specific, easy to understand, and directly related to reducing energy and water consumption.
  Do not provide tips that involve purchasing new devices, or expensive renovations.

  Format your response as a JSON object that adheres to the following schema:
  ${JSON.stringify(SmartSavingTipsOutputSchema.jsonSchema)}
`,
});

const smartSavingTipsFlow = ai.defineFlow(
  {
    name: 'smartSavingTipsFlow',
    inputSchema: SmartSavingTipsInputSchema,
    outputSchema: SmartSavingTipsOutputSchema,
  },
  async input => {
    const {output} = await smartSavingTipsPrompt(input);
    return output!;
  }
);
