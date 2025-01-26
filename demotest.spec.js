import { test, expect } from '@playwright/test';

test('demo', async({page}) => {
    await page.goto('https://realworld.qa.guru/');
    await page.getByText('Egypt').click();
})