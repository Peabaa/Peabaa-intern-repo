const calculateBonus = require('./salaryCalculator');

test('returns correct bonus for admin role', () => {
    const adminUser = { role: "admin", baseSalary: 50000 };
    expect(calculateBonus(adminUser)).toBe(60000); // 50000 * 1.2
});

test('returns correct bonus for manager role', () => {
    const managerUser = { role: "manager", baseSalary: 40000 };
    expect(calculateBonus(managerUser)).toBe(48000); // 40000 * 1.2
});

test('returns 0 for regular user role', () => {
    const regularUser = { role: "employee", baseSalary: 30000 };
    expect(calculateBonus(regularUser)).toBe(0); // No bonus for regular users
});

test('returns 0 for missing user data', () => {
    const invalidUser = { name: "John Doe" }; // Missing role and baseSalary
    expect(calculateBonus(invalidUser)).toBe(0); // No bonus for invalid user data
});