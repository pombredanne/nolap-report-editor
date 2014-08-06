'use strict';

//GetAttribute() returns "boolean" values and will return either "true" or null
describe('Report', function(){
    var Report = require('../../app/report/report-page');
    var report;

    it('should have a Report Editor title', function(){
        // FAC report in account w@28.io:
        report = new Report('1fueA5hrxIHxvRf7Btr_J6efDJ3qp-s9KV731wDc4OOaw');
        report.visitPage();
    });

    it('should have 107 elements', function(){
        expect(report.taxonomy.elements.count()).toBe(107);
    });
    
    it('should have the proper css properties', function() {
        var abstractElement = report.taxonomy.getElementName(report.taxonomy.elements.get(0));
        var concreteElement = report.taxonomy.getElementName(report.taxonomy.elements.get(4));
        expect(abstractElement.getCssValue('font-weight')).toMatch(/bold|700/);
        expect(abstractElement.getCssValue('padding-left')).toBe('5px');
        expect(concreteElement.getCssValue('font-weight')).toMatch(/normal|400/);
        expect(concreteElement.getCssValue('padding-left')).toBe('30px');
    });
    
    it('last element should be scrollable to', function(){
        var last = report.taxonomy.elements.last();
        last.click();
    });

    it('should only contain formulas that compile without error', function(){
        var recompilePage = report.taxonomy.concepts.recompile;
        recompilePage.visitPage();
        recompilePage.recompileAndValidateFormulas();
        expect(recompilePage.errorMessages.count()).toBe(0);
        expect(recompilePage.successMessages.count()).toBe(66);
    });

    it('should select Coca Cola on filters page', function(){
        report.filters.visitPage();
        report.filters.closeSelectedFiltersTag('DOW30');
        report.filters.setFiltersEntityName('Coca Cola', 2);
        expect(report.filters.selectedFilters.cik.count()).toBe(1);
    });

    it('should render ratios as decimals', function(){
        report.spreadsheet.visitPage();
        var roas = report.spreadsheet.getValueTDsByHeaderContainingText('(ROA)');
        expect(roas.count()).toBe(1);
        var value = roas.get(0).element(by.css('div > span.ng-binding'));
        expect(value.getText()).toBe('0.10');
    });
});
