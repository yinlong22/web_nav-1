const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);//字符串变数组，才能存入hashMap
const hashMap = xObject || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'},
];

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//删除/开头的内容
};

const render = () => {//新建网站
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
    <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
        <svg class="icon">
        <use xlink:href="#icon-close"></use>
        </svg>
</div>
    </div>
</li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        });
        $li.on('click', '.close', (e) => {
            e.stopPropagation();//点击colse的时候阻住跳转
            hashMap.splice(index, 1);
            render()
        })
    });
};

render();

$('.addButton')
    .on('click', () => {//监听点击事件
        let url = window.prompt('请问你要添加的网址是啥');
        if (url.indexOf('http' !== 0)) {//如果没加http前缀自动加上
            url = 'https://' + url
        }
        console.log(url);
        hashMap.push({//push到hash表
            logo: simplifyUrl(url)[0],
            url: url
        });
        render()
    });

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);//数组变字符串，才能存入localStorage
    localStorage.setItem('x', string)
};


$(document).on('keypress', (e) => {
    const {key} = e;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
});

