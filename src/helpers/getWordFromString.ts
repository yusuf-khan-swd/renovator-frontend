const getWordFromString = (inputString: string, wordCount: number) => {
  const uptoWordCount = wordCount;

  // make array of string with empty string for word then take 60 words
  const splitData = inputString.split(" ");
  const sliceSplitData = splitData.slice(0, uptoWordCount);

  // Check array of words length is less then uptoWordCount if not then add ellipsis
  const shortData =
    splitData.length <= uptoWordCount
      ? splitData.join(" ")
      : sliceSplitData.join(" ") + "...";

  return shortData;
};

export default getWordFromString;
