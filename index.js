const fs = require('fs');

module.exports = {
  markup: '',
  init: function() {
    this.markup = '';
    this.xs.empty();
    this.sm.empty();
    this.md.empty();
    this.lg.empty();
    this.xl.empty();
    this.set();
    return this;
  },
  reset: function() {
    this.add(this.tag('html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video').m('0').p('0').b('0').fontSize('100%').font('inherit').verticalAlign('baseline').close());
    this.add(this.tag('article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section').d('block').close());
    this.add(this.tag('body').lineHeight('1').close());
    this.add(this.tag('ol,ul').listStyle('none').close());
    this.add(this.tag('blockquote,q').quotes('none').close());
    this.add(this.tag('blockquote:before,blockquote:after,q:before,q:after').content("''").content('none').close());
    this.add(this.tag('table').borderCollapse('collapse').borderSpacing('0').close());
    return this;
  },
  grid: function(breakpoint) {
    if (!breakpoint || !(breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl')) {
      breakpoint = 'sm';
    }
    this.add(this.tag('@-ms-viewport').w('device-width').close());
    this.add(this.tag('html').boxSizing('border-box').prop('-ms-overflow-style','scrollbar').close());
    this.add(this.tag('*,*::before,*::after').boxSizing('inherit').close());
    this.add(this.tag('.container').w('100%').ml('auto').mr('auto').close());
    this.add(this.tag('.row').d('-ms-flexbox').d('flex').prop('-ms-flex-wrap','wrap').flexWrap('wrap').close());
    this.add(this.tag('.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-10,.col-11,.col-12,.col,.col-auto').position('relative').w('100%').minHeight('1px').close());
    this.add(this.tag('.col').prop('-ms-flex-preferred-size','0').flexBasis('0').prop('-ms-flex-positive','1').flexGrow('1').maxWidth('100%').close());
    this.add(this.tag('.col-auto').prop('-ms-flex','0 0 auto').flex('0 0 auto').w('auto').maxWidth('none').close());
    this.add(this.tag('.col-1').prop('-ms-flex','0 0 8.333333%',breakpoint).flex('0 0 8.333333%',breakpoint).maxWidth('8.333333%',breakpoint).close());
    this.add(this.tag('.col-2').prop('-ms-flex','0 0 16.666667%',breakpoint).flex('0 0 16.666667%',breakpoint).maxWidth('16.666667%',breakpoint).close());
    this.add(this.tag('.col-3').prop('-ms-flex','0 0 25%',breakpoint).flex('0 0 25%',breakpoint).maxWidth('25%',breakpoint).close());
    this.add(this.tag('.col-4').prop('-ms-flex','0 0 33.333333%',breakpoint).flex('0 0 33.333333%',breakpoint).maxWidth('33.333333%',breakpoint).close());
    this.add(this.tag('.col-5').prop('-ms-flex','0 0 41.666667%',breakpoint).flex('0 0 41.666667%',breakpoint).maxWidth('41.666667%',breakpoint).close());
    this.add(this.tag('.col-6').prop('-ms-flex','0 0 50%',breakpoint).flex('0 0 50%',breakpoint).maxWidth('50%',breakpoint).close());
    this.add(this.tag('.col-7').prop('-ms-flex','0 0 58.333333%',breakpoint).flex('0 0 58.333333%',breakpoint).maxWidth('58.333333%',breakpoint).close());
    this.add(this.tag('.col-8').prop('-ms-flex','0 0 66.666667%',breakpoint).flex('0 0 66.666667%',breakpoint).maxWidth('66.666667%',breakpoint).close());
    this.add(this.tag('.col-9').prop('-ms-flex','0 0 75%',breakpoint).flex('0 0 75%',breakpoint).maxWidth('75%',breakpoint).close());
    this.add(this.tag('.col-10').prop('-ms-flex','0 0 83.333333%',breakpoint).flex('0 0 83.333333%',breakpoint).maxWidth('83.333333%',breakpoint).close());
    this.add(this.tag('.col-11').prop('-ms-flex','0 0 91.666667%',breakpoint).flex('0 0 91.666667%',breakpoint).maxWidth('91.666667%',breakpoint).close());
    this.add(this.tag('.col-12').prop('-ms-flex','0 0 100%',breakpoint).flex('0 0 100%',breakpoint).maxWidth('100%',breakpoint).close());
    return this;
  },
  minify: function() {
    this.set();
    this.markup = this.markup.replace(/(\n\s\s\s\s|\n|\n\s\s\s\s\s\s\s\s|\s\s\s\s)/g,'');
    return this;
  },
  set: function() {
    this.xs.set();
    this.sm.set();
    this.md.set();
    this.lg.set();
    this.xl.set();
    this.markup = this.xs.markup + this.sm.markup + this.md.markup + this.lg.markup + this.xl.markup;
  },
  xs: {
    animations: [],
    tags: [],
    markup: '',
    set: function() {
      if (this.animations.length > 0 && this.tags.length > 0) {
        this.markup =
        `${this.animations.join('\n') || ''}${'\n'}${this.tags.join('\n') || ''}${'\n'}`;
      }
      else if (this.animations.length > 0) {
        this.markup =
        `${this.animations.join('\n') || ''}${'\n'}`;
      }
      else if (this.tags.length > 0) {
        this.markup =
        `${this.tags.join('\n') || ''}${'\n'}`;
      }
      else {
        this.markup = '';
      }
    },
    empty: function() {
      this.markup = '';
      this.tags = [];
      this.animations = [];
    }
  },
  sm: {
    animations: [],
    tags: [],
    markup: '',
    query: 576,
    size: function(pixels) {
      if (typeof pixels === 'number') {
        this.query = pixels;
      }
    },
    set: function() {
      if (this.animations.length > 0 && this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.animations.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else {
        this.markup = '';
      }
    },
    empty: function() {
      this.markup = '';
      this.tags = [];
      this.animations = [];
    }
  },
  md: {
    animations: [],
    tags: [],
    markup: '',
    query: 768,
    size: function(pixels) {
      if (typeof pixels === 'number') {
        this.query = pixels;
      }
    },
    set: function() {
      if (this.animations.length > 0 && this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.animations.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else {
        this.markup = '';
      }
    },
    empty: function() {
      this.markup = '';
      this.tags = [];
      this.animations = [];
    }
  },
  lg: {
    animations: [],
    tags: [],
    markup: '',
    query: 992,
    size: function(pixels) {
      if (typeof pixels === 'number') {
        this.query = pixels;
      }
    },
    set: function() {
      if (this.animations.length > 0 && this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.animations.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else {
        this.markup = '';
      }
    },
    empty: function() {
      this.markup = '';
      this.tags = [];
      this.animations = [];
    }
  },
  xl: {
    animations: [],
    tags: [],
    markup: '',
    query: 1200,
    size: function(pixels) {
      if (typeof pixels === 'number') {
        this.query = pixels;
      }
    },
    set: function() {
      if (this.animations.length > 0 && this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.animations.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.animations.join('\n    ') || ''}${'\n}\n'}`;
      }
      else if (this.tags.length > 0) {
        this.markup =
        `@media only screen and (min-width: ${this.query}px) {${'\n    '}${this.tags.join('\n    ') || ''}${'\n}\n'}`;
      }
      else {
        this.markup = '';
      }
    },
    empty: function() {
      this.markup = '';
      this.tags = [];
      this.animations = [];
    }
  },
  keys: function(name) {
    if (!name || typeof name !== 'string') {
      return this;
    }
    let animation = `@keyframes ${name} {`;
    if (arguments.length > 1) {
      let props = Array.from(arguments);
      props = props.slice(1);
      for (let i = 0; i < props.length; i++) {
        animation += `${'\n    '}${props[i].tag} {${props[i].inline}}`;
      }
    }
    animation += `\n}`;
    this.xs.animations.push(animation);
    this.xs.set();
    this.set();
    return this;
  },
  add: function(tag) {
    if (tag && typeof tag === 'object') {
      if (tag.xs) {
        this.xs.tags.push(tag.xs);
      }
      if (tag.sm) {
        this.sm.tags.push(tag.sm);
      }
      if (tag.md) {
        this.md.tags.push(tag.md);
      }
      if (tag.lg) {
        this.lg.tags.push(tag.lg);
      }
      if (tag.xl) {
        this.xl.tags.push(tag.xl);
      }
      this.xs.set();
      this.sm.set();
      this.md.set();
      this.lg.set();
      this.xl.set();
      this.set();
    }
    return this;
  },
  tag: function(tagName) {
    if (!tagName || typeof tagName !== 'string') {
      throw new Error('Name for CSS selector is required.');
    }
    return {
      tag: tagName,
      xs: [],
      sm: [],
      md: [],
      lg: [],
      xl: [],
      inline: [],
      add: function(rule,argument) {
        if (!rule) {
          return;
        }
        if (argument && typeof argument === 'string') {
          if (argument === 'sm') {
            this.sm.push(rule);
          }
          else if (argument === 'md') {
            this.md.push(rule);
          }
          else if (argument === 'lg') {
            this.lg.push(rule);
          }
          else if (argument === 'xl') {
            this.xl.push(rule);
          }
        }
        else {
          this.xs.push(rule);
        }
        this.inline.push(rule);
      },
      prop: function(attribute,value,query) {
        if (!attribute || !value || typeof attribute !== 'string' || typeof value !== 'string') {
          return this;
        }
        let rule = `${attribute}: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      p: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `padding: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      pt: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `padding-top: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      pb: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `padding-bottom: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      pl: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `padding-left: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      pr: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `padding-right: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      m: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `margin: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      mt: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `margin-top: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      mb: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `margin-bottom: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      ml: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `margin-left: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      mr: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `margin-right: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      w: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `width: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      h: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `height: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      d: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `display: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      b: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      bt: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-top: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      bb: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-bottom: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      bl: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-left: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      br: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-right: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      c: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `color: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      bg: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      o: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `opacity: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      bgGradient: function(rgbaOne,rgbaTwo,image,query) {
        if (!rgbaOne || !rgbaTwo) {
          return this;
        }
        let rule;
        if (image) {
          rule = `background: linear-gradient(to bottom left,rgba(${rgbaOne.trim().replace(/(\;|\:)/g,'')}),rgba(${rgbaTwo.trim().replace(/(\;|\:)/g,'')})), url('${image.trim().replace(/(\;|\:)/g,'')}') no-repeat center center fixed;`;
        }
        else {
          rule = `background: linear-gradient(to bottom left,rgba(${rgbaOne.trim().replace(/(\;|\:)/g,'')}),rgba(${rgbaTwo.trim().replace(/(\;|\:)/g,'')}));`;
        }
        this.add(rule,query);
        return this;
      },
      animation: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationDelay: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-delay: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationDirection: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-direction: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationDuration: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-duration: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationFillMode: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-fill-mode: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationIterationCount: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-iteration-count: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationName: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-name: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationPlayState: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-play-state: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      animationTimingFunction: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `animation-timing-function: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundAttachment: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-attachment: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundClip: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-clip: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundColor: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-color: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundImage: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-image: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundOrigin: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-origin: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundPosition: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-position: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundRepeat: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-repeat: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backgroundSize: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `background-size: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderImage: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-image: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderRadius: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-radius: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderRadiusBottomRight: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-bottom-right-radius: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderRadiusBottomLeft: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-bottom-left-radius: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderRadiusTopRight: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-top-right-radius: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderRadiusTopLeft: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-top-left-radius: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      minWidth: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `min-width: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      minHeight: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `min-height: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      maxWidth: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `max-width: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      maxHeight: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `max-height: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      content: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `content: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      alignContent: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `align-content: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      alignItems: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `align-items: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      alignSelf: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `align-self: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      flex: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `flex: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      flexBasis: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `flex-basis: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      flexDirection: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `flex-direction: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      flexFlow: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `flex-flow: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      flexGrow: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `flex-grow: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      flexWrap: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `flex-wrap: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      justifyContent: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `justify-content: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      order: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `order: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      font: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      sansSerif: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-family: ${value.trim().replace(/(\;|\:)/g,'')}, sans-serif;`;
        this.add(rule,query);
        return this;
      },
      serif: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-family: ${value.trim().replace(/(\;|\:)/g,'')}, serif;`;
        this.add(rule,query);
        return this;
      },
      monotype: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-family: ${value.trim().replace(/(\;|\:)/g,'')}, monotype;`;
        this.add(rule,query);
        return this;
      },
      cursive: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-family: ${value.trim().replace(/(\;|\:)/g,'')}, cursive;`;
        this.add(rule,query);
        return this;
      },
      fontSize: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-size: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      fontStretch: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-stretch: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      fontSizeAdjust: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-size-adjust: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      fontStyle: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-style: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      fontVariant: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-variant: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      fontWeight: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `font-weight: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      listStyle: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `list-style: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      listStyleImage: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `list-style-image: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      listStyleType: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `list-style-type: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      listStylePosition: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `list-style-position: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderCollapse: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-collapse: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      borderSpacing: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `border-spacing: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      captionSide: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `caption-side: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      emptyCells: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `empty-cells: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      tableLayout: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `table-layout: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      direction: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `direction: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      tabSize: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `tab-size: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textAlign: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-align: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textAlignLast: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-align-last: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textDecoration: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-decoration: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textDecorationColor: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-decoration-color: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textDecorationLine: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-decoration-line: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textDecorationStyle: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-decoration-style: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textIndent: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-indent: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textJustify: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-justify: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textOverflow: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-overflow: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textShadow: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-shadow: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      textTransform: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `text-transform: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      lineHeight: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `line-height: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      verticalAlign: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `vertical-align: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      letterSpacing: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `letter-spacing: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      wordSpacing: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `word-spacing: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      whiteSpace: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `white-space: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      wordBreak: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `word-break: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      wordWrap: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `word-wrap: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      backfaceVisibility: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `backface-visibility: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      perspective: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `perspective: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      perspectiveOrigin: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `perspective-origin: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transform: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transform: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transformOrigin: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transform-origin: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transformStyle: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transform-style: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transition: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transition: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transitionDelay: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transition-delay: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transitionDuration: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transition-duration: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transitionProperty: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transition-property: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      transitionTimingFunction: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `transition-timing-function: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      position: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `position: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      top: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `top: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      bottom: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `bottom: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      left: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `left: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      right: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `right: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      float: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `float: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      clear: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `clear: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      z: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `z-index: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      overflow: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `overflow: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      overflowX: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `overflow-x: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      overflowY: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `overflow-y: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      resize: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `resize: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      clip: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `clip: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      v: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `visibility: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      cursor: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `cursor: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      boxShadow: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `box-shadow: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      boxSizing: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `box-sizing: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      quotes: function(value,query) {
        if (!value || typeof value !== 'string') {
          return this;
        }
        let rule = `quotes: ${value.trim().replace(/(\;|\:)/g,'')};`;
        this.add(rule,query);
        return this;
      },
      close: function() {
        let selectorsObj = {tag: this.tag};
        if (this.xs.length > 0) {
          selectorsObj.xs = `${this.tag} {${'\n    '}${this.xs.join('\n    ')}${'\n'}}`;
        }
        else {
          selectorsObj.xs = '';
        }
        if (this.sm.length > 0) {
          selectorsObj.sm = `${this.tag} {${'\n        '}${this.sm.join('\n        ')}${'\n    '}}`;
        }
        else {
          selectorsObj.sm = '';
        }
        if (this.md.length > 0) {
          selectorsObj.md = `${this.tag} {${'\n        '}${this.md.join('\n        ')}${'\n    '}}`;
        }
        else {
          selectorsObj.md = '';
        }
        if (this.lg.length > 0) {
          selectorsObj.lg = `${this.tag} {${'\n        '}${this.lg.join('\n        ')}${'\n    '}}`;
        }
        else {
          selectorsObj.lg = '';
        }
        if (this.xl.length > 0) {
          selectorsObj.xl = `${this.tag} {${'\n        '}${this.xl.join('\n        ')}${'\n    '}}`;
        }
        else {
          selectorsObj.xl = '';
        }
        if (this.inline.length > 0) {
          selectorsObj.inline = `${this.inline.join('')}`;
        }
        else {
          selectorsObj.inline = '';
        }
        return selectorsObj;
      }
    }
  },
  file: function(path) {
    if (path && this.markup) {
      fs.writeFile(path,this.markup,error => {
        if (error) throw error;
      });
    }
  }
};
