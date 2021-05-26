export default function atBottomOfPage () {
  return window.scrollY >= document.body.scrollHeight - 2 * window.outerHeight
}
