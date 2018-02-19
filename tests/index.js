// test.js
import path from 'path';
import test from 'ava';
import sao from 'sao';

const template = {
  fromPath: path.join(__dirname, '..'),
  targetPath: './',
};

test('default values', async (t) => {
  const stream = await sao.mockPrompt(template, {
  });

  t.snapshot(stream.fileList, 'Generated files');
});
