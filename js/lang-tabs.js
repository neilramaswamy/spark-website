/*

Desired:

<ul class="nav nav-tabs">
  <li class="lang-tab lang-tab-<lang> active">
    <a href="#">Python</a>
  </li>
</ul>

<div class="tab-content">
  <div class="tab-pane tab-pane-python active">...</div>
  ...
</div>

What we have:

<div class="codetabs">

<div data-lang="python"  markdown="1">
...
</div>


</div>

*/

function codeTabs() {
  $("div.codetabs").each(function () {
    /*
    Currently, our markup has the following structure:

    <div class="codetabs">
      <div data-lang="python" markdown="1">
      ...
      </div>

      <!-- more languages here -->
    </div>

    */

    // In the Spark repo, "codetabs" is the class that contains all of
    // the divs that each individually contain the language-specific code.
    // However, in spark-website, the class is "tab-content". To make Spark
    // code snippets compatible with spark-website, we add the 'tab-content"
    // class here.
    $(this).addClass("tab-content");

    /*
    Before the codetabs div, we'll insert this ul. Now our markup looks
    like:
      <ul class="nav nav-tabs"></ul>

      <div class="codetabs tab-content">
        <div data-lang="python" markdown="1">
          ...
        </div>
        
        ...
      </div>
    
    Now, we need to populate the nav bar with just the languages that
    we have below.
    */
    const tabBar = $('<ul class="nav nav-tabs"></ul>');
    $(this).before(tabBar);

    // Add each code sample to the tab bar:
    const codeSamples = $(this).children("div");

    codeSamples.each(function (idx) {
      const active = idx === 0 ? "active" : "";
      const lang = $(this).data("lang");

      // Construct the tab pane
      $(this)
        .addClass("tab-pane")
        .addClass(`tab-pane-${lang}`)
        .addClass(active);

      // Generating the header tab
      const capitalizedLang = lang.substr(0, 1).toUpperCase() + lang.substr(1);
      tabBar.append(`
        <li class="lang-tab lang-tab-${lang} ${active}">
          <a href="#">${capitalizedLang}</a>
        </li>
      `);
    });
  });
}

function changeLanguage(lang) {
  return function (e) {
    e.preventDefault();
    console.log("change lang to ", lang);

    var scrollOffset = $(this).offset().top - $(document).scrollTop();
    $(".tab-pane").removeClass("active");
    $(".tab-pane-" + lang).addClass("active");
    $(".lang-tab").removeClass("active");
    $(".lang-tab-" + lang).addClass("active");
    $(document).scrollTop($(this).offset().top - scrollOffset);
  };
}

$(function () {
  codeTabs();

  const languages = ["scala", "java", "python", "r"];
  for (let i = 0; i < languages.length; i++) {
    const lang = languages[i];
    $(".lang-tab-" + lang).click(changeLanguage(lang));
  }
});
