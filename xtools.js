var xpagehistory = {
  loadinganimation : 0,
  execute : function () {
  	if (mw.config.get('wgArticleId') === 0) return; // no deleted articles, no special pages
  	if (mw.config.get('wgCurRevisionId') != mw.config.get('wgRevisionId')) return; // only current revision
  	$("<div id='xtools' style='font-size:84%; line-height:1.2em; margin:0 0 0.4em 0.2em; width:auto;'><span id='xtoolsresult'></span><span id='xtoolsloading'>.</span></div>").insertBefore("#contentSub");
  	loadinganimation = window.setInterval( function() { if ($("#xtoolsloading").html() == ".&nbsp;&nbsp;") $("#xtoolsloading").html("&nbsp;.&nbsp;"); else if ($("#xtoolsloading").html() == "&nbsp;.&nbsp;") $("#xtoolsloading").html("&nbsp;&nbsp;."); else $("#xtoolsloading").html(".&nbsp;&nbsp;"); }, 300);
  	importScriptURI("//tools.wmflabs.org/xtools/api.php?pageid=" +  mw.config.get('wgArticleId') + "&db=" + mw.config.get('wgDBname') + "&nsid=" + mw.config.get('wgNamespaceNumber') + "&pagetitle=" + mw.config.get('wgPageName') + "&wditemid=" + mw.config.get('wgWikibaseItemId') + "&uselang=" + mw.config.get('wgContentLanguage') );
  },
  resultloaded : function( res ) {
  	$("#xtoolsresult").html(res);
  	this.stoploading();
  },
  stoploading : function() {
  	clearInterval(loadinganimation);
  	$('#xtoolsloading').remove();
  }
}
if ( (mw.config.get('wgAction') == "view") ) $( xpagehistory.execute );