import{u as l,c as h,w as o,_ as c,o as d,a as t,b as n,d as e}from"./app-22QfyZ7d.js";import{_ as u}from"./GitHubLink.vue_vue_type_script_setup_true_lang-W-4yFDkj.js";import{_ as p}from"./Tweet.vue_vue_type_script_setup_true_lang-rS-7Dc5L.js";import{_ as f}from"./prettier-print-width-UOSnocnv.js";import"./logo-github-Brc8t0bp.js";const g={class:"prose m-auto slide-enter-content"},m=t("p",null,[t("div",{class:"table-of-contents"},[t("div",{class:"table-of-contents-anchor"},[t("div",{class:"i-ri-menu-2-fill"})]),t("ul",null,[t("li",null,[t("a",{href:"#i-love-prettier"},"I Love Prettier ")]),t("li",null,[t("a",{href:"#but-why-not"},"But, Why Not? "),t("ul",null,[t("li",null,[t("a",{href:"#it’s-opinionated"},"It’s Opinionated ")]),t("li",null,[t("a",{href:"#the-line-wrapping-noise"},"The Line Wrapping Noise ")]),t("li",null,[t("a",{href:"#mess-with-eslint"},"Mess with ESLint ")])])]),t("li",null,[t("a",{href:"#alternatives"},"Alternatives ")]),t("li",null,[t("a",{href:"#wrapping-up"},"Wrapping Up ")])])])],-1),y=t("blockquote",null,[t("p",null,[t("a",{href:"/posts/why-not-prettier-zh"},"中文 Chinese Version")])],-1),w=t("p",null,"I have started writing this post multiple times but never ended up posting it. I wasn’t able to figure out a proper way to express my position about Prettier. But this time, I think I should try harder to explain that for future reference.",-1),_=t("p",null,[e("First of all, I am not against Prettier. Actually, "),t("strong",null,"I love it"),e(".")],-1),b=t("h2",{id:"i-love-prettier",tabindex:"-1"},[e("I Love Prettier "),t("a",{class:"header-anchor",href:"#i-love-prettier","aria-hidden":"true"},"#")],-1),k=t("p",null,[t("a",{href:"https://prettier.io/",target:"_blank",rel:"noopener"},"Prettier"),e(" is a great tool, and it saved me a lot of time. I appreciated the efforts of the maintainers and contributors to make it possible and formed a great foundation of how the clean code would look for the community. I have to confess that the title is a bit clickbait. I use Prettier a lot for interactive documentation and playgrounds, like "),t("a",{href:"https://github.com/vueuse/vueuse/blob/c7dd1a48471d0a8b4f2b5a567baa12c24504eaee/scripts/utils.ts#L36-L46",target:"_blank",rel:"noopener"},"VueUse"),e(" and "),t("a",{href:"https://github.com/unocss/unocss/blob/7c332f235aff2045addb60c2668331a3ccfd1359/packages/inspector/client/composables/usePrettify.ts",target:"_blank",rel:"noopener"},"UnoCSS"),e(". I love it for the out-of-box support of a lot of languages. I could make the generated code pretty with less than 5 mins of integrating Prettier.")],-1),A=t("h2",{id:"but-why-not",tabindex:"-1"},[e("But, Why Not? "),t("a",{class:"header-anchor",href:"#but-why-not","aria-hidden":"true"},"#")],-1),v=t("p",null,"If you have ever come across my open source projects, you might find that I rarely use Prettier to format the source code. In this post, I would try to explain the reason why I made this decision:",-1),I=t("h3",{id:"it’s-opinionated",tabindex:"-1"},[e("It’s Opinionated "),t("a",{class:"header-anchor",href:"#it’s-opinionated","aria-hidden":"true"},"#")],-1),P=t("p",null,[e("Prettier describes itself to be "),t("a",{href:"https://github.com/prettier/prettier",target:"_blank",rel:"noopener"},'"an opinionated code formatter"'),e(".")],-1),x=t("p",null,[t("strong",null,"Opinionated"),e(" essentially means it’s not for everyone. Prettier makes a lot of hard-coded decisions to provide a minimal configuration interface. That makes it very easy to use (it’s excellent!) and the code consistent across projects. However, on the other hand, it also means you are losing the ability to have fine-grained tweaks to how your code should look like.")],-1),D=t("p",null,"While I love most of Prettier’s decisions, it sometimes makes you upset when you find something you don’t want and don’t have a workaround.",-1),E=t("h3",{id:"the-line-wrapping-noise",tabindex:"-1"},[e("The Line Wrapping Noise "),t("a",{class:"header-anchor",href:"#the-line-wrapping-noise","aria-hidden":"true"},"#")],-1),B=t("p",null,[e("The main thing that itches me a lot is the auto wrapping / unwrapping based on the length of the code. Prettier has the concept of "),t("a",{href:"https://prettier.io/docs/en/options.html#print-width",target:"_blank",rel:"noopener"},[t("code",null,"printWidth")]),e(", which constrains each line to fit with a certain width (by default, it’s 80 characters). It’s generally great to have the code fitting in one screen and avoid horizontal scrolls.")],-1),T=t("p",null,"However, I often found it hurting the readability and git diffing.",-1),L=t("p",null,[t("a",{href:"https://twitter.com/patak_dev",target:"_blank",rel:"noopener"},"@patak_dev"),e(" recently brought up an example of that in PR reviewing:")],-1),C=t("p",{lang:"en",dir:"ltr"},[e("Formatters are awesome, especially when doing PR reviews. They also introduce issues though, for example when an addition triggers a line break. The diff isn't showing what changed here. It would be great if diff viewers would be Prettier-aware, counting line breaks as spacing. "),t("a",{href:"https://t.co/ZuApmctllU"},"pic.twitter.com/ZuApmctllU")],-1),S=t("a",{href:"https://twitter.com/patak_dev/status/1575784199767859200?ref_src=twsrc%5Etfw"},"September 30, 2022",-1),W=t("p",null,[e("Sometimes when you modify a string literal in JavaScript that may make the line a bit longer than the value of "),t("code",null,"printwidth"),e(", Prettier will force wrapping the line. It breaks the inline diffing and make the changes hard to review. Imagine in another pull request, we might reduce the string a bit shorter, Prettier will then unwrap the lines back to one line. Back and forth, it creates a lot of unnecessary noises.")],-1),j=t("p",null,"The following image shows another example:",-1),N=t("a",{href:"https://prettier.io/playground/#N4Igxg9gdgLgprEAuc0DOMAEBXNcBOamAvJgNoA6UmmwOe+AkgCZKYCMANPQVAIYBbOGwogAggBsAZgEs4mAMJ98QiTJh9RmAL6cqNOrgIs2AJm5H8-ISJABxGf0wAlCGgAWfKFt37aPJlZMAGYLBmthTFEAZXdsAHNMADk+ACNsHz1qf0sTTAAWMN5BSNFnPncBL0wAMXw+Bky-QwY8gFYiqxLbABU3d3kAGQBPbFSEJuyW4yCANk6I22iCeJkIZJkJCCllSYBdAG4qEE4QCAAHGDWoNGRQZXwIAHcABWUEW5Q+CSe+YdvTql6mAANZwGDREqDRxwZA7CR4QHAsEQ858MCOeLIGD4bBwU5wATjZjMODMQZeeLYPjxOA1CAqPgwK5QLFfbAwCAnEDuGACCQAdXc6jgaDRYDgyxu6hkADd1MNkOA0ACQI4GDAXvV4lU4d9ESAAFZoAAe0UxEjgAEVsBB4HqEfiQGjCAQlak0nAJNzzvhHDABTJmDB3Mh8uZnY88AL6uclb7RQRZbDTgBHW3wLUXT4gBoAWigcDJZO5+Dg6ZkZa1NN1SHhBrwAhk2NxTrQFutGdhdf1To0qUDwdDSAjOL4m0xCggAlrIFFbW5Rh6aU+9adsrxjCgpNg0TAfsuYm30Rgw0tDrw2m0QA",target:"_blank"},[t("img",{src:f,"scale-110":"",block:"",m:"b--5!"})],-1),F=t("p",null,[t("sup",null,[t("em",null,[e("The 42 of "),t("code",null,"printWidth"),e(" is made up for demonstration, but it happens in any "),t("code",null,"printWidth")])])],-1),Z=t("p",null,'On the left is the input code and on the right is the output of Prettier. I don’t need to point out but you probably already have the answer of which one is "more pretty". From my point of view, Prettier follows the rule too strict. And in fact it makes the code much harder to read and modify, violating the initial goal of formatting - to make the code more readable.',-1),Q=t("p",null,[e("The real pain point is that this behavior is not optional. "),t("strong",null,"You can’t disable it completely"),e("("),t("a",{href:"https://github.com/prettier/prettier/issues/3468",target:"_blank",rel:"noopener"},"#3468"),e("). Increasing the "),t("code",null,"printWidth"),e(" only delays the circumstance and will affect other files that you didn’t touch. The only workaround you can do is to use "),t("code",null,"// prettier-ignore"),e(', which to me, the "all or nothing" choice loses the point of using Prettier in the first place.')],-1),O=t("h3",{id:"mess-with-eslint",tabindex:"-1"},[e("Mess with ESLint "),t("a",{class:"header-anchor",href:"#mess-with-eslint","aria-hidden":"true"},"#")],-1),q=t("p",null,[e("Prettier as a code formatter, only cares about code styles but not the logic. Thus we see it’s quite common for projects to use ESLint along with Prettier to also check the logic. If you have ever configured that yourself, you might notice there are some functionality overlaps between them - ESLint can also lint for code styles. The common practice is to use "),t("a",{href:"https://github.com/prettier/eslint-config-prettier",target:"_blank",rel:"noopener"},[t("code",null,"eslint-config-prettier")]),e(" to disable those overlaps rules in ESLint (there are also "),t("a",{href:"https://prettier.io/docs/en/integrating-with-linters.html",target:"_blank",rel:"noopener"},"a few other solutions"),e(").")],-1),H=t("p",null,"However, the approach creates quite a lot of mess to me:",-1),J=t("p",{lang:"en",dir:"ltr"},[e("My points here:"),t("br"),t("br"),e("1. Prettier Only is cool - It's out-of-box."),t("br"),e("2. If you need to use ESLint, it can do the formatting as good as Prettier - and more configurable")],-1),M=t("a",{href:"https://twitter.com/antfu7/status/1279149211523538944?ref_src=twsrc%5Etfw"},"July 3, 2020",-1),G=t("p",{lang:"en",dir:"ltr"},[e("3. Prettier + ESLint still needs a lot of configs - It doesn't make your life easier."),t("br"),e("4. You can have full control in ESLint but not in Prettier, mixing them together feels weird."),t("br"),e("5. I don't think parsing two times can be faster (maybe I am wrong)")],-1),U=t("a",{href:"https://twitter.com/antfu7/status/1279149212974776320?ref_src=twsrc%5Etfw"},"July 3, 2020",-1),Y=t("p",null,[t("a",{href:"https://developer.ibm.com/articles/auto-fix-and-format-your-javascript-with-eslint/",target:"_blank",rel:"noopener"},"ESLint’s auto fix"),e(" could also do the formatting just as well as Prettier - with much more freedom of choices.")],-1),R=t("h2",{id:"alternatives",tabindex:"-1"},[e("Alternatives "),t("a",{class:"header-anchor",href:"#alternatives","aria-hidden":"true"},"#")],-1),z=t("p",null,"ESLint is essential to my workflow to ensure the code quality. If ESLint is already capable of doing formatting, the best solution for me is to use it in one go.",-1),V=t("p",null,"I spent some time configuring my ESLint and made it a config preset:",-1),X=t("p",null,"It turns out, the setup configuration can also be very minimal:",-1),K=t("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light",style:{"--s-dark":"#dbd7caee","--s-light":"#393a34","--s-dark-bg":"#121212","--s-light-bg":"#ffffff"},tabindex:"0"},[t("code",{class:"language-bash"},[t("span",{class:"line"},[t("span",{style:{"--s-dark":"#80A665","--s-light":"#59873A"}},"npm"),t("span",{style:{"--s-dark":"#C98A7D","--s-light":"#B56959"}}," i"),t("span",{style:{"--s-dark":"#C99076","--s-light":"#A65E2B"}}," -D"),t("span",{style:{"--s-dark":"#C98A7D","--s-light":"#B56959"}}," @antfu/eslint-config")])])],-1),$=t("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light",style:{"--s-dark":"#dbd7caee","--s-light":"#393a34","--s-dark-bg":"#121212","--s-light-bg":"#ffffff"},tabindex:"0"},[t("code",{class:"language-js"},[t("span",{class:"line"},[t("span",{style:{"--s-dark":"#758575DD","--s-light":"#A0ADA0"}},"// eslint.config.js")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--s-dark":"#4D9375","--s-light":"#1E754F"}},"import"),t("span",{style:{"--s-dark":"#BD976A","--s-light":"#B07D48"}}," antfu"),t("span",{style:{"--s-dark":"#4D9375","--s-light":"#1E754F"}}," from"),t("span",{style:{"--s-dark":"#C98A7D99","--s-light":"#B5695999"}}," '"),t("span",{style:{"--s-dark":"#C98A7D","--s-light":"#B56959"}},"@antfu/eslint-config"),t("span",{style:{"--s-dark":"#C98A7D99","--s-light":"#B5695999"}},"'")]),e(`
`),t("span",{class:"line"}),e(`
`),t("span",{class:"line"},[t("span",{style:{"--s-dark":"#4D9375","--s-light":"#1E754F"}},"export"),t("span",{style:{"--s-dark":"#4D9375","--s-light":"#1E754F"}}," default"),t("span",{style:{"--s-dark":"#80A665","--s-light":"#59873A"}}," antfu"),t("span",{style:{"--s-dark":"#666666","--s-light":"#999999"}},"({")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--s-dark":"#758575DD","--s-light":"#A0ADA0"}},"  // customizations")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--s-dark":"#666666","--s-light":"#999999"}},"})")])])],-1),tt=t("p",null,[e("That’s all you need. With the IDE extensions, it’s also possible to trigger auto fixing on save. It works similarly to Prettier but respects your choices when to break the lines, with many best practices of linting. It’s also quite opinionated, but thanks to the "),t("a",{href:"https://eslint.org/docs/latest/use/configure/configuration-files-new",target:"_blank",rel:"noopener"},"new Flat Config"),e(", it gives you "),t("a",{href:"https://github.com/antfu/eslint-config#customization",target:"_blank",rel:"noopener"},"the full control of customizations"),e(" over every single bit that you want to change. Moreover, you can always fork it to make your own versions.")],-1),et=t("blockquote",null,[t("p",null,[e('Sidenote: You might hear so voicing saying "Don’t use ESLint for formatting" - '),t("a",{href:"https://github.com/eslint/eslint.org/issues/435",target:"_blank",rel:"noopener"},"here are some discussions and a response from the ESLint team"),e(", for you to make your own judgement.")])],-1),ot=t("h2",{id:"wrapping-up",tabindex:"-1"},[e("Wrapping Up "),t("a",{class:"header-anchor",href:"#wrapping-up","aria-hidden":"true"},"#")],-1),nt=t("p",null,"This post is only trying to explain my personal experience and opinions. Of course, you can have different views and don’t need to agree with me at all. I am not blaming Prettier for this. Different tools have different purposes and focuses, and there is no better or worse. It’s just about using the right tools for the right circumstances. I will still be a happy user of Prettier in usages that I don’t need the maximum customizability, and using ESLint exclusively for my projects’ source code.",-1),it=t("p",null,"Hope this could make myself clear and maybe give you some insights. Cheers!",-1),ft={__name:"why-not-prettier",setup(st){const s={title:"Why I don't use Prettier",date:"2022-10-01T00:00:00.000Z",lang:"en",duration:"12min",description:"The reason why I don't use Prettier in my projects.",image:"https://antfu.me/og/why-not-prettier.png",meta:[{property:"og:title",content:"Why I don't use Prettier"},{name:"twitter:title",content:"Why I don't use Prettier"},{name:"description",content:"The reason why I don't use Prettier in my projects."},{property:"og:description",content:"The reason why I don't use Prettier in my projects."},{name:"twitter:description",content:"The reason why I don't use Prettier in my projects."},{property:"og:image",content:"https://antfu.me/og/why-not-prettier.png"},{name:"twitter:image",content:"https://antfu.me/og/why-not-prettier.png"},{name:"twitter:card",content:"summary_large_image"}]};return l({title:"Why I don't use Prettier",meta:[{property:"og:title",content:"Why I don't use Prettier"},{name:"twitter:title",content:"Why I don't use Prettier"},{name:"description",content:"The reason why I don't use Prettier in my projects."},{property:"og:description",content:"The reason why I don't use Prettier in my projects."},{name:"twitter:description",content:"The reason why I don't use Prettier in my projects."},{property:"og:image",content:"https://antfu.me/og/why-not-prettier.png"},{name:"twitter:image",content:"https://antfu.me/og/why-not-prettier.png"},{name:"twitter:card",content:"summary_large_image"}]}),(rt,lt)=>{const i=p,a=u,r=c;return d(),h(r,{frontmatter:s},{default:o(()=>[t("div",g,[m,y,w,_,b,k,A,v,I,P,x,D,E,B,T,L,n(i,null,{default:o(()=>[C,e("— patak (@patak_dev) "),S]),_:1}),W,j,N,F,Z,Q,O,q,H,n(i,{conversation:"none"},{default:o(()=>[J,e("— Anthony Fu (@antfu7) "),M]),_:1}),n(i,{conversation:"none"},{default:o(()=>[G,e("— Anthony Fu (@antfu7) "),U]),_:1}),Y,R,z,V,n(a,{repo:"antfu/eslint-config",name:"@antfu/eslint-config"}),X,K,$,tt,et,ot,nt,it])]),_:1})}}};export{ft as default};