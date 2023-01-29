/**
 * 며칠전인지 몇시간전인지 스트링으로 얻음
 * @param createDate Linux Epoch Time
 * @returns {String}
 */
const getTimeAgoString = (createDate)  => {
  if(createDate === null || createDate === "" || createDate === undefined){
    return "";
  }
  const start = new Date(createDate);
  const end = new Date(); // 현재 날짜

  const diff = (end - start); // 경과 시간
 
  const times = [
    {time: "분", milliSeconds: 1000 * 60},
    {time: "시간", milliSeconds: 1000 * 60 * 60},
    {time: "일", milliSeconds: 1000 * 60 * 60 * 24},
    {time: "개월", milliSeconds: 1000 * 60 * 60 * 24 * 30},
    {time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365},
  ].reverse();
  
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);
    
    if (betweenTime > 0) {
      return `${betweenTime}${value.time}전`;
    }
  }
  
  return "방금 전";
};

export default { getTimeAgoString };
