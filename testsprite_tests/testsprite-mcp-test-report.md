# TestSprite AI Testing Report (MCP)

---

## 1️⃣ Document Metadata

| Field            | Value                          |
|------------------|--------------------------------|
| **Project Name** | expense-tracker-ocr            |
| **Date**         | 2026-03-13                     |
| **Prepared by**  | TestSprite AI Team             |
| **Test Type**    | Frontend E2E (Development mode)|
| **Total Tests**  | 15                             |
| **Pass Rate**    | 46.67% (7 passed / 8 failed)   |

---

## 2️⃣ Requirement Validation Summary

### REQ-01: User Registration

#### TC001 — Register a new user successfully and reach the dashboard
- **Test Code:** [TC001_Register_a_new_user_successfully_and_reach_the_dashboard.py](./tmp/TC001_Register_a_new_user_successfully_and_reach_the_dashboard.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/ee49cf40-821d-47a6-b235-1cfee9577c86
- **Status:** ✅ Passed
- **Analysis:** The full registration flow works correctly. Filling name, email, and password (≥6 chars) and submitting redirects the user to the dashboard with an active session.

---

#### TC004 — Registration validation: password shorter than 6 characters is rejected
- **Test Code:** [TC004_Registration_validation_password_shorter_than_6_characters_is_rejected.py](./tmp/TC004_Registration_validation_password_shorter_than_6_characters_is_rejected.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/b089bf99-4175-4c12-995b-691aae1b421b
- **Status:** ✅ Passed
- **Analysis:** HTML5 `minlength` validation correctly blocks form submission when the password has fewer than 6 characters, showing the native browser tooltip.

---

### REQ-02: Dashboard Analytics

#### TC007 — Dashboard shows current month summary and default analytics view
- **Test Code:** [TC007_Dashboard_shows_current_month_summary_and_default_analytics_view.py](./tmp/TC007_Dashboard_shows_current_month_summary_and_default_analytics_view.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/eb63b2b0-988f-4564-958c-2dcb677f751d
- **Status:** ✅ Passed
- **Analysis:** Dashboard loads correctly showing the current month/year, total amount ($0.00 for new accounts), transaction count, average, and the default "Diario" tab with charts.

---

#### TC008 — Switch between analytics tabs (Diario, Semanal, Categorias, Transacciones)
- **Test Code:** [TC008_Switch_between_analytics_tabs_Diario_Semanal_Categorias_Transacciones.py](./tmp/TC008_Switch_between_analytics_tabs_Diario_Semanal_Categorias_Transacciones.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/755a8303-766f-4669-9d78-aa010ea1fd79
- **Status:** ✅ Passed
- **Analysis:** All four tabs (Diario, Semanal, Categorias, Transacciones) are accessible and switch content correctly without page reload.

---

#### TC011 — View previous month analytics using left arrow navigation
- **Test Code:** [TC011_View_previous_month_analytics_using_left_arrow_navigation.py](./tmp/TC011_View_previous_month_analytics_using_left_arrow_navigation.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/1ba322e4-c25b-4d33-905d-521e0950336c
- **Status:** ✅ Passed
- **Analysis:** The left arrow correctly navigates to the previous month, updating the displayed month/year label and re-fetching stats for that period.

---

### REQ-03: Expense Management

#### TC012 — Create a new expense with valid manual inputs
- **Test Code:** [TC012_Create_a_new_expense_with_valid_manual_inputs.py](./tmp/TC012_Create_a_new_expense_with_valid_manual_inputs.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/410a03e7-3a5e-4968-9764-8b26ef28e9ef
- **Status:** ❌ Failed
- **Analysis:** The category `<select>` element causes repeated stale-node errors during test automation. The form appears unstable — the page intermittently reverts to `/dashboard` mid-interaction. This may be caused by a premature navigation or a state reset on the expenses page that unmounts the form component during the test browser's interactions.

---

#### TC013 — Create expense form fields accept valid values and submission adds row
- **Test Code:** [TC013_Create_expense_form_fields_accept_valid_values_and_submission_adds_row.py](./tmp/TC013_Create_expense_form_fields_accept_valid_values_and_submission_adds_row.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/ea65667b-492c-4749-b007-26591de05038
- **Status:** ❌ Failed
- **Analysis:** The "Agregar" submit button becomes non-interactable/stale after filling the form. Combined with the page reverting to the dashboard, this confirms the form component has a DOM stability issue — likely a React re-render or router redirect that unmounts the modal before the test can click submit.

---

#### TC014 — Successful create shows the expense in the list with correct description
- **Test Code:** [TC014_Successful_create_shows_the_expense_in_the_list_with_correct_description.py](./tmp/TC014_Successful_create_shows_the_expense_in_the_list_with_correct_description.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/a035c712-697a-4642-a6c1-bf2be97127f9
- **Status:** ❌ Failed
- **Analysis:** Test failed finding the sidebar navigation element (`xpath=/html/body/div[2]/aside/nav/div[2]/div/a`). The sidebar DOM structure does not match the expected XPath, likely due to a layout wrapper div being injected. This is a selector stability issue downstream from the same form instability.

---

#### TC015 — Create expense validation: non-numeric amount shows error and stays on form
- **Test Code:** [TC015_Create_expense_validation_non_numeric_amount_shows_error_and_stays_on_form.py](./tmp/TC015_Create_expense_validation_non_numeric_amount_shows_error_and_stays_on_form.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/e4c82080-bec7-4824-ae61-8d6c940070a5
- **Status:** ✅ Passed
- **Analysis:** The amount input correctly rejects non-numeric values via HTML5 `type="number"` validation, keeping the form open and displaying a native browser error.

---

#### TC016 — Create expense validation: empty amount shows error and stays on form
- **Test Code:** [TC016_Create_expense_validation_empty_amount_shows_error_and_stays_on_form.py](./tmp/TC016_Create_expense_validation_empty_amount_shows_error_and_stays_on_form.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/466998ba-926c-4d57-9724-8458c1fcd2eb
- **Status:** ❌ Failed
- **Analysis:** Same stale/non-interactable button issue as TC013. The form instability prevents the empty-amount validation path from being reached. Root cause is the same DOM instability on the expenses form.

---

#### TC017 — AI categorization suggests a category and user accepts it before creating expense
- **Test Code:** [TC017_AI_categorization_suggests_a_category_and_user_accepts_it_before_creating_expense.py](./tmp/TC017_AI_categorization_suggests_a_category_and_user_accepts_it_before_creating_expense.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/9e91b963-e7d5-4f33-9e58-cc7ea2719fc8
- **Status:** ❌ Failed
- **Analysis:** The AI categorization button showed "Analizando..." state but never resolved into a suggestion. The `/api/categorize` endpoint may not have an OpenAI API key configured in the test environment, or the API call is timing out. The UI shows processing state but hangs indefinitely without a result.

---

### REQ-04: Budget Management

#### TC021 — View budgets page shows category budgets and progress bars
- **Test Code:** [TC021_View_budgets_page_shows_category_budgets_and_progress_bars.py](./tmp/TC021_View_budgets_page_shows_category_budgets_and_progress_bars.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/092b22c0-dd9d-4394-90e5-f0ca4da9c5d3
- **Status:** ✅ Passed
- **Analysis:** The budgets page loads and renders correctly. For new accounts with no configured budgets it shows the empty state "No hay presupuestos configurados" as expected.

---

#### TC022 — Edit a category budget and save updates the displayed amount
- **Test Code:** [TC022_Edit_a_category_budget_and_save_updates_the_displayed_amount.py](./tmp/TC022_Edit_a_category_budget_and_save_updates_the_displayed_amount.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/214d04e7-ea19-482b-9ca6-ca9893e1e9ad
- **Status:** ❌ Failed
- **Analysis:** The test expected pre-existing budget entries to edit, but the fresh test account has no budgets configured. The test should first create a budget before testing the edit flow. This is a test-data setup gap, not a product bug.

---

#### TC024 — Invalid negative budget amount shows validation error and does not save
- **Test Code:** [TC024_Invalid_negative_budget_amount_shows_validation_error_and_does_not_save.py](./tmp/TC024_Invalid_negative_budget_amount_shows_validation_error_and_does_not_save.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/2b67a19f-2ae1-46f6-80db-3b080afce27b
- **Status:** ❌ Failed
- **Analysis:** No validation message is shown when entering a negative amount (-10) in the budget form. The `/api/budgets` endpoint and the frontend form do not currently validate for negative values — a negative budget can be saved silently. This is a **real product bug**.

---

#### TC025 — Non-numeric budget amount shows validation error and does not save
- **Test Code:** [TC025_Non_numeric_budget_amount_shows_validation_error_and_does_not_save.py](./tmp/TC025_Non_numeric_budget_amount_shows_validation_error_and_does_not_save.py)
- **Test Visualization:** https://www.testsprite.com/dashboard/mcp/tests/87ef7cf4-ec22-4eec-960e-1f1de24d8e71/f92c6fb4-f34c-4eae-9a61-71970668beef
- **Status:** ❌ Failed
- **Analysis:** Non-numeric input ("abc") in the budget amount field was blocked by the browser's `type="number"` field from being typed, but no explicit UI validation message was displayed. The Save button was blocked by a missing category selection instead of an amount validation message. Frontend validation for budget amount is insufficient.

---

## 3️⃣ Coverage & Matching Metrics

- **Pass rate: 46.67%** (7 passed / 8 failed out of 15 tests)

| Requirement              | Total Tests | ✅ Passed | ❌ Failed |
|--------------------------|-------------|-----------|----------|
| REQ-01: User Registration | 2           | 2         | 0        |
| REQ-02: Dashboard Analytics | 3         | 3         | 0        |
| REQ-03: Expense Management | 6          | 1         | 5        |
| REQ-04: Budget Management  | 4          | 1         | 3        |
| **TOTAL**                | **15**      | **7**     | **8**    |

---

## 4️⃣ Key Gaps / Risks

### 🔴 Critical Issues

1. **Expense form DOM instability (TC012, TC013, TC016)**
   - The expense creation form (`/dashboard/expenses`) has a React state/routing issue causing the page to revert to `/dashboard` mid-interaction and making buttons stale/non-interactable.
   - **Risk:** Users may lose their input when creating expenses. The form modal may close unexpectedly.
   - **Suggested fix:** Investigate whether a router redirect or an uncaught error in the `POST /api/expenses` call is unmounting the form. Add error boundaries and prevent navigation during form submission.

2. **No validation for negative budget amounts (TC024)**
   - The budget form accepts and saves negative values without any error message.
   - **Risk:** Users can set nonsensical budgets (e.g., -$100), corrupting budget tracking data.
   - **Suggested fix:** Add `min="0"` to the budget amount input and server-side validation in `POST /api/budgets`.

### 🟡 Moderate Issues

3. **AI categorization hangs without result (TC017)**
   - The `/api/categorize` endpoint does not resolve in the test environment, leaving the UI stuck in "Analizando..." state with no timeout or error feedback.
   - **Risk:** If the OpenAI API key is missing or rate-limited, the UI offers no feedback to the user.
   - **Suggested fix:** Add a timeout and error handler in the categorize API call; show a user-friendly error if the AI suggestion fails.

4. **Budget tests require pre-existing data (TC022)**
   - Tests for editing budgets fail because no budget data exists for a fresh account.
   - **Risk:** Not a product bug, but the test plan should include a setup step to create budget data before testing edit flows.

### 🟢 Confirmed Working

- ✅ Full user registration flow with redirect to dashboard
- ✅ Password minimum-length validation (6 chars)
- ✅ Dashboard analytics with monthly navigation
- ✅ Tab switching (Diario / Semanal / Categorias / Transacciones)
- ✅ Non-numeric amount validation on expense form
- ✅ Budget page renders correctly (empty state)
