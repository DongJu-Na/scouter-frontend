/**
 * KDA에 따라서 색상을 골라준다.
 * 3.x: green
 * 4.x: blue
 * 5.x: yellow
 * @param KDA
 * @returns {String} color
 */
const colorOfKDA = (KDA) => {
  if (KDA < 3) return "kdaDefault";
  if (KDA < 4) return "kdaGreen";
  if (KDA < 5) return "kdaBlue";
  return "kdaYellow";
};

/**
 * 승률에 따라서 색상을 골라준다.
 * 60%이상이면 red
 * @param winRatio 승률
 * @returns {String} color
 */
const colorOfWinRatio = (winRatio) => {
  if (winRatio < 0.6) return "winRatioDefault";
  return "winRatioRed";
};

/**
 * 평점에 따라서 색상을 골라준다.
 * 6.0 이상일 경우 yellow
 * @param score
 */
const colorOfScore = (score) => {
  if (score < 6.0) return "scoreDefault";
  return "scoreYellow";
};

export { colorOfKDA, colorOfWinRatio, colorOfScore };
