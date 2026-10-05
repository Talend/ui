import { expect, test } from '@playwright/test';

test('CMF state, configured events, action creators, and HTTP saga', async ({ page }) => {
	await page.goto('/CmfFeatures');

	await expect(page.getByRole('heading', { name: 'CMF examples' })).toBeVisible();
	await expect(page.getByText('Count: 0', { exact: true })).toBeVisible();

	await page.getByRole('button', { name: 'Increment CMF state' }).click();
	await page.getByLabel('State note').fill('CMF state persists');
	await expect(page.getByText('Count: 1', { exact: true })).toBeVisible();

	await page.getByRole('button', { name: 'Dispatch configured event' }).click();
	await expect(
		page.getByText('A configured dispatch event ran.', { exact: true }).first(),
	).toBeVisible();

	await page.getByRole('button', { name: 'Run configured action creator' }).click();
	await expect(
		page.getByText('A registered action creator ran.', { exact: true }).first(),
	).toBeVisible();

	await page.getByRole('button', { name: 'Fetch with CMF HTTP saga' }).click();
	await expect(page.getByText('Fetched Management Console (HTTP 200).')).toBeVisible();

	await page.getByRole('link', { name: 'Router examples' }).click();
	await page.getByRole('link', { name: 'CMF examples' }).click();
	await expect(page.getByText('Count: 1', { exact: true })).toBeVisible();
	await expect(page.getByLabel('State note')).toHaveValue('CMF state persists');
});

test('router push, replace, route parameters, and saga cancellation', async ({ page }) => {
	await page.goto('/RouterFeatures');

	await page.getByRole('button', { name: 'Push item route' }).click();
	await expect(page).toHaveURL(/\/RouterFeatures\/item\/pushed-item$/);
	await expect(page.getByText('pushed-item', { exact: true })).toBeVisible();
	await expect(page.getByText('Watching route parameter pushed-item.')).toBeVisible();

	await page.getByRole('button', { name: 'Replace with another item route' }).click();
	await expect(page).toHaveURL(/\/RouterFeatures\/item\/replaced-item$/);
	await expect(page.getByText('Watching route parameter replaced-item.')).toBeVisible();

	await page.goBack();
	await expect(page).toHaveURL(/\/RouterFeatures$/);
	await expect(page.getByText('Route saga for replaced-item was cancelled.')).toBeVisible();
});
