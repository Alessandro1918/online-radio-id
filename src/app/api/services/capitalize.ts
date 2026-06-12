// Uppercase the first letter of every word in a string
export function capitalize(phrase: string): string {
  // return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const lowerCasedStr = phrase.toLowerCase()
  // The regex matches: 
  // The start of the string (^) OR a whitespace character (\s) OR an open parenthesis "\(" OR an open square-brackets "\[" OR an open double quote (\"), either one followed by a word character (\w), OR
  // a dot character (\.) followed by a word character (\w) (like the non-first letters of the acronyms "R.E.M." or "T.N.T.") 
  const upperCasedStr = lowerCasedStr.replace(/(^|\s|\(|\[|\")\w|\.\w/g, match => {
    return match.toUpperCase()
  })
  return upperCasedStr
    .replace("Feat.", "feat.")
    .replace("Ac/dc", "AC/DC")
    .replace("Inxs", "INXS")
    .replace("Zz Top", "ZZ Top")
    .replace("Nx Zero", "NX Zero")
}
