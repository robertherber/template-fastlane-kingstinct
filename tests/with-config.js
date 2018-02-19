// test.js
import path from 'path';
import test from 'ava';
import sao from 'sao';

const template = {
  fromPath: path.join(__dirname, '..'),
  targetPath: './',
};

test('add config', async (t) => {
  const stream = await sao.mockPrompt(template, {
    INCLUDE_SAMPLE_CONFIG_IMPLEMENTATION: true,
    SUPPORT_MULTIPLE_APP_IDS: true,
  });

  t.snapshot(stream.fileList, 'Generated files');
});
