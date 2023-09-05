async function loadExtractors(player) {
   await player.extractors.loadDefault();
}

module.exports = { loadExtractors };
