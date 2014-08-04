/*global browser:false, element:false, by:false */
'use strict';

var Recompile = require('./recompile/recompile-page');

function Concepts(reportId){
    this.reportId = reportId;
    this.recompile = new Recompile(this.reportId);
    this.form = element(by.name('conceptSearchForm'));
    this.conceptName = element(by.model('conceptName'));
}

Concepts.prototype.visitPage = function(){
    browser.get('/' + this.reportId);
};

Concepts.prototype.createConcept = function(conceptName){
    this.conceptName.clear();
    this.conceptName.sendKeys(conceptName);
    var completion = element.all(by.repeater('match in matches track by $index'));
    return completion.count().then(function(count){
        if(count > 0) {
            return completion.last().click().then(function(){
                //wait for the report to save
                browser.waitForAngular();
            });
        }
    });
};

Concepts.prototype.hasError = function(){
    return this.form.element(by.css('.has-error')).isDisplayed();
};

Concepts.prototype.getRecompile = function(){
    return this.recompile;
};

module.exports = Concepts;
