
/**
 * 不能通过<script>引入的方式使用，需将将代码粘贴到需使用的script代码内使用
 * HTML5 document.currentScript Polify
 * IE6-11
 * Chrome/Firefox/Opera
 */
(function (win, doc) {
    var
        scripts = doc.getElementsByTagName('script'),
        // chrome
        isSupportCurrentScript = 'currentScript' in doc,
        // ie6-10
        isSupportReadyState = 'readyState' in scripts[0],
        // Result
        execScript = null

    if (isSupportCurrentScript)
        // Chrome
        execScript = doc.currentScript

    if (!isSupportCurrentScript && isSupportReadyState) {
        // IE6-10
        for (var i = 0, len = scripts.length; i < len; i++) {
            if (scripts[i]['readyState'] === 'interactive') {
                execScript = scripts[i]
                break
            }
        }
    }

    if (!isSupportCurrentScript && !isSupportReadyState) {
        // IE11 fuck Microsoft!!!
        try {
            var err = new Error
            throw err
        } catch (thrownErr) {
            var div = document.createElement('div')
            div.innerHTML = thrownErr.stack
            var
                str = div.innerHTML.replace(/\s/g, '').replace(/\:\d+/g, ''),
                r = str.match(/^\w*\(.*(\b\w+\b\.js.*)\)$/)[1],
                scripts = document.getElementsByTagName('script')
            for (var i = 0, len = scripts.length; i < len; i++) {
                if (~scripts[i].getAttribute('src').indexOf(r)) {
                    execScript = scripts[i]
                    break
                }
            }
        }
    }

    // There is Result
    win.getExecScript = function () { return execScript }

}(window, document))
