# template-fastlane-kingstinct

> SAO template to quickly set up fastlane for React Native

 ![NMPVersion](https://img.shields.io/npm/v/template-fastlane-kingstinct.svg)

This is a fastlane setup covering two specific details:
* Using git tags to keep track of build numbers
* Make it easy to distribute the same binary with to different App Identifiers. This has two main uses:
  * Test/production builds based on the same binary
  * When you want to redistribute the same binary to many App Ids - for example if you're creating a whitelabel solution

This means that if you're looking for the simplest fastlane configuration - you've come to the wrong place. Also this is work in progress - so be prepared to do some manual steps that aren't documented.

Trying to keep it "rescaffoldable" (re-run it if your project and requirements changes). Chosen values are saved globally by SAO (so when you're changing projects you might want to keep an eye out so everything is right).

I'm sure there are many things that can be improved and cleaned up. I try to expand the template to work for all new projects I'm involved in. Contributions are welcome!

## Usage

Install [SAO](https://github.com/egoist/sao) first.

```bash
yarn global add sao
# or
npm i -g sao
```

### From npm

From your React Native root folder:

```bash
sao fastlane-kingstinct
```

### From git

From your React Native root folder:

```bash
sao robertherber/template-fastlane-kingstinct
```

## License

MIT &copy; [robertherber](https://github.com/robertherber)
