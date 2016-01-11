//  https://github.com/yicheng-irun/yirua
/*
    https://github.com/yicheng-irun/yirua
    yirua.js
    A mini and ease-to-use templating plugin for jQuery or Zepto
    @author Yicheng <yicheng-me@qq.com>
    @license MIT
    @version 1.1
*/

(function ($) {
    if (!$) {
        console.error("JQuery or Zepto is undefineded!");
        return;
    }
    var templateList = {};
    $.yirua = {};
    $.yirua.VERSION = "1.1";


    var valueRegex = /\{\{(.+?)\}\}/g;// /\{\{([=%])(.+?)\}\}/g;

    //获取孩子模版
    function getChildModelDom(htmldom) {
        var hc = htmldom.children(), r = [], sh;
        for (var ci = 0; ci < hc.length; ci++) {
            sh = hc.eq(ci);
            if (sh.attr("yr-model") != undefined) {
                r.push(hc.eq(ci));
            } else {
                r = r.concat(getChildModelDom(sh));
            }
        }
        return r;
    }
    //解析模版
    function parseTemplate($htmldom, ysparent) {
        var psobj = {
            type: null,  // text,map,if
            varp: null,
            varc: null,
            parent: ysparent,
            childidlist: [],
            yshtml: ""
        };
        var ysmd, wds;

        var cdlist = getChildModelDom($htmldom);
        //console.log(cdlist);
        for (var cdi = 0; cdi < cdlist.length; cdi++) {
            psobj.childidlist.push(getTemplate(cdlist[cdi], psobj));
        }
        psobj.yshtml = $htmldom.html();
        ysmd = $htmldom.attr("yr-model");
        if (ysmd != undefined) {
            wds = ysmd.split(" ");
            if (wds[1] && wds[0] == 'if') { //This feature in version 2.0 release
                psobj.type = "if";
                psobj.varc = wds[1];
            } else if (wds[2] && wds[1] == "in") {
                psobj.type = "map";
                psobj.varc = wds[0];
                psobj.varp = wds[2];
            }
        } else {
            psobj.type = "text";
        }
        return psobj;
    }

    //获取ys模版对象
    function getTemplate(_this, ysparent) {
        if (!_this.attr("yr-model-id")) {
            var ttime = new Date().getTime() + "" + (Math.random() * 10).toFixed(0);
            while (templateList[ttime]) {
                ttime = new Date().getTime() + "" + (Math.random() * 10).toFixed(0);
            }
            templateList[ttime] = true;
            _this.attr("yr-model-id", ttime + "");
            templateList[ttime] = parseTemplate(_this, ysparent);
            _this.html("");
            if (ysparent) {
                return ttime;
            }
        }
        return templateList[_this.attr("yr-model-id")];
    }

    function findValue(varstr, tvars, getnode) {
        if (varstr == tvars.varname) {
            if (getnode) {
                return tvars;
            } else {
                return tvars.value;
            }
        } else if (typeof (tvars.value) == "object" && varstr in tvars.value) {
            return tvars.value[varstr];
        } else if (tvars.parent) {
            return findValue(varstr, tvars.parent, getnode)
        }
        return null;
    }
    function getValue(varstr, tvars) {
        var parts = $.trim(varstr).split('.');
        var fv, b;
        if (parts.length) {
            fv = findValue(parts[0], tvars, false);
            if (fv != null) {
                b = parts.shift();
                while (parts.length) {
                    if (parts[0] == "_key") {
                        return findValue(b, tvars, true)["varkey"];
                    } else if (!(parts[0] in fv)) {
                        return "";
                    }
                    fv = fv[parts.shift()];
                }
                return fv;
            }
        }
        return "";
    }

    function renderReplace(template, zyyobj) {
        var htm = "", $tdiv = null;
        var sihtml = template.yshtml.replace(valueRegex, function (arg1, arg2, arg3, arg4) {
            return getValue(arg2, zyyobj);
        });
        if (sihtml.indexOf("yr-src") != -1) {
            $tdiv = $(document.createElement("div")).html(sihtml);
            $tdiv.find("[yr-src]").each(function (idx, dom) {
                $(this).attr("src", $(this).attr("yr-src"));
            });
        }
        if (sihtml.indexOf("yr-model") != -1) {
            if ($tdiv == null) {
                $tdiv = $(document.createElement("div")).html(sihtml);
            }
            var cdms = $tdiv.find("[yr-model]");
            for (var ci = 0; ci < cdms.length; ci++) {
                var tplt = getTemplate(cdms.eq(ci), template);
                cdms.eq(ci).html(renderTemplate(tplt, getValue(tplt.varp, zyyobj), zyyobj));
            }
        }
        if ($tdiv == null) {
            htm += sihtml;
        } else {
            htm += $tdiv.html();
        }
        return htm;
    }


    //如果次数为0，则构建作用域链对象
    function renderTemplate(template, vars, parent) {
        var htm = "";
        var tvars = {
            value: vars,
            varname: template.varp,
            varkey: null,
            parent: parent
        }
        if (template.type == "map") {
            var zyyobj = {
                value: null,
                varname: template.varc,
                varkey: null,
                parent: tvars
            }
            for (mi in tvars.value) {
                zyyobj.value = tvars.value[mi];
                zyyobj.varkey = mi;
                htm += renderReplace(template, zyyobj);
            }
        } else if (template.type == "text") {
            htm += renderReplace(template, tvars)
        } else if (template.type == "if") {
            //This feature in version 2.0 release
        }
        return htm;
    }

    $.fn.render = function (vars) {
        var tplt;
        for (var ti = 0; ti < this.length; ti++) {
            tplt = getTemplate(this.eq(ti), null);
            this.eq(ti).html(renderTemplate(tplt, vars), null);
        }
        return this;
    }
    $.fn.renderAsString = function (vars) {
        var tplt;
        var result = [];
        for (var ti = 0; ti < this.length; ti++) {
            tplt = getTemplate(this.eq(ti), null);
            result.push(renderTemplate(tplt, vars), null);
        }
        if (this.length == 1) { result = result[0]; }
        return result;
    }
    $.fn.renderAppend = function (vars) {
        var tplt;
        for (var ti = 0; ti < this.length; ti++) {
            tplt = getTemplate(this.eq(ti), null);
            this.eq(ti).append(renderTemplate(tplt, vars), null);
        }
        return this;
    }

    $.fn.renderPrepend = function (vars) {
        var tplt;
        for (var ti = 0; ti < this.length; ti++) {
            tplt = getTemplate(this.eq(ti), null);
            this.eq(ti).prepend(renderTemplate(tplt, vars), null);
        }
        return this;
    }

    $.yirua.setValueRegex = function (regex) {
        valueRegex = regex;
    }

})(window["jQuery"] ? window.jQuery : window["Zepto"] ? window["Zepto"] : null);