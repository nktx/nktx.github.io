(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{141:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(150),o=n(148);e.default=function(){return r.a.createElement(i.a,null,r.a.createElement(o.a,{title:"404: Not found"}),r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},144:function(t,e,n){"use strict";n.d(e,"a",function(){return c});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),s=(n(32),n(145),r.a.createContext({})),c=function(t){return r.a.createElement(s.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};c.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},145:function(t,e,n){var a;t.exports=(a=n(147))&&a.default||a},146:function(t){t.exports={data:{site:{siteMetadata:{title:"nktx.github.io"}}}}},147:function(t,e,n){"use strict";n.r(e);n(33);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),s=n(55),c=n(2),u=function(t){var e=t.location,n=c.default.getResourcesForPathnameSync(e.pathname);return r.a.createElement(s.a,Object.assign({location:e,pageResources:n},n.json))};u.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=u},148:function(t,e,n){"use strict";var a=n(149),r=n(0),i=n.n(r),o=n(4),s=n.n(o),c=n(152),u=n.n(c);function l(t){var e=t.description,n=t.lang,r=t.meta,o=t.keywords,s=t.title,c=a.data.site,l=e||c.siteMetadata.description;return i.a.createElement(u.a,{htmlAttributes:{lang:n},title:s,titleTemplate:"%s",meta:[{name:"description",content:l},{property:"og:title",content:s},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:l}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})}l.defaultProps={lang:"en",meta:[],keywords:[]},l.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},e.a=l},149:function(t){t.exports={data:{site:{siteMetadata:{title:"nktx.github.io",description:"nktx.github.io",author:"@khnkenny"}}}}},150:function(t,e,n){"use strict";var a=n(146),r=n(0),i=n.n(r),o=n(4),s=n.n(o),c=n(144),u=function(t){t.siteTitle;return i.a.createElement("header",null)};u.propTypes={siteTitle:s.a.string},u.defaultProps={siteTitle:""};var l=u,d=(n(151),function(t){var e=t.children;return i.a.createElement(c.a,{query:"755544856",render:function(t){return i.a.createElement(i.a.Fragment,null,i.a.createElement(l,{siteTitle:t.site.siteMetadata.title}),i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},i.a.createElement("main",null,e),i.a.createElement("footer",null)))},data:a})});d.propTypes={children:s.a.node.isRequired};e.a=d}}]);
//# sourceMappingURL=component---src-pages-404-js-42f50cec02a8567dd90b.js.map