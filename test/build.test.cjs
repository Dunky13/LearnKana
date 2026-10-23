const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const test = require('node:test');
const path = require('node:path');
const vm = require('node:vm');

const sources = ['preload', 'jchar', 'jblock', 'q', 'jall', 'gapi', 'index'];
const source = sources.map(name => readFileSync(`js/src/${name}.js`, 'utf8')).join('\n');
const gulp = path.join(path.dirname(require.resolve('gulp')), 'bin/gulp.js');

function exercise(code) {
  const context = vm.createContext({ console });
  vm.runInContext(code, context, { timeout: 1000 });
  return vm.runInContext(`(function () {
    var chars = new Interface().loadCharacters();
    var first = chars.getBlock(0).get(0);
    var question = new Q(new QA(first.hiragana, [first.romaji], JChar.TYPE.HIRAGANA), first);
    var correct = question.answer(first.romaji) === first;
    var score = first.hScore;
    var incorrect = question.answer('incorrect') === undefined;
    return {
      blocks: chars.jBlockArr.map(function (block) {
        return block.jCharArr.map(function (character) {
          return [character.romaji, character.hiragana, character.katakana];
        });
      }),
      correct: correct, score: score, incorrect: incorrect, afterIncorrect: first.hScore
    };
  })()`, context, { timeout: 1000 });
}

test('both Gulp tasks preserve source order, kana and answer scoring', () => {
  const result = exercise(source);
  const expected = JSON.stringify(result);
  assert.equal(result.blocks.length, 27);
  assert.equal(result.blocks[0][0].join(','), 'a,あ,ア');
  assert.equal(result.correct, true);
  assert.equal(result.score, 1);
  assert.equal(result.incorrect, true);
  assert.equal(result.afterIncorrect, 0);
  try {
    execFileSync(process.execPath, [gulp, 'long'], { stdio: 'pipe' });
    const long = readFileSync('js/dist/index.js', 'utf8');
    assert.equal(JSON.stringify(exercise(long)), expected);
    assert.ok(long.indexOf('function JChar') < long.indexOf('function Q('));
    execFileSync(process.execPath, [gulp, 'min'], { stdio: 'pipe' });
    const min = readFileSync('js/dist/index.js', 'utf8');
    assert.ok(min.length < long.length);
    assert.equal(JSON.stringify(exercise(min)), expected);
  } finally {
    execFileSync(process.execPath, [gulp, 'min'], { stdio: 'pipe' });
  }
});
