const BONUS_MULTIPLIER = 1.2;

function calculateBonus(user) {
  if (!user || !user.role || !user.baseSalary) {
    return 0; // Guard clause for invalid data
  }
  
  const isEligibleRole = (user.role === "admin" || user.role === "manager");
  
  if (isEligibleRole) {
    return user.baseSalary * BONUS_MULTIPLIER;
  }
  
  return 0; // Regular users get no bonus
}

module.exports = calculateBonus;