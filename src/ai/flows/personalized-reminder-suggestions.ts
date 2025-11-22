'use server';

/**
 * @fileOverview A flow for providing personalized reminder suggestions based on user usage patterns.
 *
 * - getPersonalizedReminderSuggestions - A function that returns personalized reminder suggestions.
 * - ReminderSuggestionsInput - The input type for the getPersonalizedReminderSuggestions function.
 * - ReminderSuggestionsOutput - The return type for the getPersonalizedReminderSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReminderSuggestionsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  usageData: z.string().describe('The user specific energy and water consumption data.'),
  applianceType: z.string().describe('Type of appliance, e.g. lights, fan, tap.'),
});
export type ReminderSuggestionsInput = z.infer<typeof ReminderSuggestionsInputSchema>;

const ReminderSuggestionsOutputSchema = z.object({
  reminderSuggestions: z.array(
    z.object({
      time: z.string().describe('Suggested time for the reminder (e.g., 22:00).'),
      reason: z.string().describe('Reasoning behind the reminder suggestion.'),
    })
  ).describe('List of personalized reminder suggestions.'),
});
export type ReminderSuggestionsOutput = z.infer<typeof ReminderSuggestionsOutputSchema>;

export async function getPersonalizedReminderSuggestions(input: ReminderSuggestionsInput): Promise<ReminderSuggestionsOutput> {
  return personalizedReminderSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedReminderSuggestionsPrompt',
  input: {schema: ReminderSuggestionsInputSchema},
  output: {schema: ReminderSuggestionsOutputSchema},
  prompt: `You are an AI assistant that provides personalized reminder suggestions for users to conserve energy and water.

  Given the user's past usage patterns and habits, analyze when reminders would be most effective for them to turn off appliances and reduce wastage.

  Provide a list of reminder suggestions, including the suggested time and the reasoning behind each suggestion.

  User ID: {{{userId}}}
  Usage Data: {{{usageData}}}
  Appliance Type: {{{applianceType}}}

  Generate the output as a JSON object that adheres to the following schema:
  ${JSON.stringify(ReminderSuggestionsOutputSchema.jsonSchema)}`,
});

const personalizedReminderSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedReminderSuggestionsFlow',
    inputSchema: ReminderSuggestionsInputSchema,
    outputSchema: ReminderSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
