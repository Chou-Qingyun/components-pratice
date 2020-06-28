// import "./popup.css";  //全局css
let styles = require("./popup.css");
// import style from "./popup.css";

/* 组件配置的接口 规范和约束业务开发人员*/
interface Ipopup {
    width? : string;
    height? : string;
    title ? : string;
    pos ? : string;
    mask ? : boolean;
    content ? : (content: HTMLElement) => void;
}
/* 组件的接口，规范组件开发人员 */
interface Icomponent {
    temContainer: HTMLElement;
    init: () => void;
    template: () => void;
    handle: () => void;
}

function popup(options: Ipopup ) {
    return new Popup(options);
}

class Popup implements Icomponent {
    temContainer;
    mask;
    constructor( private settings : Ipopup ) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            title: '',
            pos: 'center',
            mask: true,
        }, this.settings);
        this.init();
    }
    // 初始化
    init() {
        this.template();
        this.settings.mask && this.createMask();
        this.handle();
        this.contentCallback();
    }
    //创建模板
    template() {
        this.temContainer = document.createElement('div');
        this.temContainer.innerHTML = `
            <h1 class="${styles.popup}">hello</h1>
            <div class="${styles['popup-title']}">
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="${styles['popup-content']}"></div>
        `;
        document.body.appendChild(this.temContainer);
    }
    //事件操作
    handle() {
        let popupClose = this.temContainer.querySelector(`.${styles['popup-title']} i`);
        popupClose.addEventListener('click', () => {
            document.body.removeChild(this.temContainer);
            this.settings.mask && document.body.removeChild(this.mask);
        });

    }

    createMask() {
        this.mask = document.createElement('div');
        this.mask.className = styles.mask;
        this.mask.style.width = '100%';
        this.mask.style.height = document.body.offsetHeight + 'px';
        document.body.appendChild(this.mask);
    }

    contentCallback() {
        let popupContent = this.temContainer.querySelector(`.${styles['popup-content']}`);
        this.settings.content(popupContent);
    }


}

export default popup;