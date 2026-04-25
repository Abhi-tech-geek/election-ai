import { test, expect } from '@playwright/test';

test('New Voter Registration flow and Chat Interaction', async ({ page }) => {
  await page.goto('/');

  // Check title visibility
  await expect(page.locator('h2', { hasText: 'Election Sahayak' })).toBeVisible();

  // Ensure Form 6 is active by default
  const activeTab = page.locator('.nav-item.active');
  await expect(activeTab).toContainText('Naya Voter ID (Form 6)');

  // Type a question
  const input = page.locator('input.chat-input');
  await input.fill('How do I apply using form 6?');
  await input.press('Enter');

  // Verify typing indicator appears immediately
  await expect(page.locator('.typing-bubble')).toBeVisible();
});
