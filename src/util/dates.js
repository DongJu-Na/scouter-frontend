/**
 * 며칠전인지 몇시간전인지 스트링으로 얻음
 * @param createDate Linux Epoch Time
 * @returns {String}
 */
const getTimeAgoString = (createDate)  => {
  const today = new Date();
  const backThen = new Date(createDate * 1000);

  const diff = today.getTime() - backThen.getTime();
  const diffTime = diff / (1000 * 60 * 60);

  if (diffTime < 1) {
    const diffMin = Math.ceil(diffTime / 60);
    if (diffMin === 1) return `a minute ago`;
    return `${diffMin} mins ago`;
  }

  if (diffTime < 24) {
    if (Math.ceil(diffTime) === 1) return `an hour ago`;
    return `${Math.ceil(diffTime)} hours ago`;
  }
  if (diffTime < 48) {
    return "Yesterday";
  }

  return `${Math.round(diffTime / 24)} days ago`;
};

export { getTimeAgoString };
