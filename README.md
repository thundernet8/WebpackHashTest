## WebpackHashTest

[Post About this](https://github.com/thundernet8/Blog/issues/2)

## More

The official hashmoduleidsplugin could keep chunhash stable via using hash module id rather number id, but it does not change the entry chunks specified in config.entry to have a hash id, and sometimes the entry chunk order may change without a config.entry change which lead to a chunkhash change.

So I write a webpack plugin [WebpackStableChunkId](https://www.npmjs.com/package/webpackstablechunkid)to solve this, clilk[this](./webpack.config.babel.js) to find the usage.

webpack自带的hashmoduleidsplugin插件通过将模块的id以引用路径的hash特征值表示，以稳定chunkhash，但是config.entry中指定的chunks仍然使用了数字id，而且有些时候尽管config.entry未改变，这些entry chunks的排序会变化，导致chunk id变化，则chunkhash在代码内容未更改的情况意外更新了。

因此我写了一个webpack插件[WebpackStableChunkId](https://www.npmjs.com/package/webpackstablechunkid)来解决这个问题，查看[示例](./webpack.config.babel.js)。
