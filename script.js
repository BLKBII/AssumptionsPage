
// Function to set decimals
function toFixed(value, precision) {
  if ($.isNumeric(value)) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
} else {
  return value;
}} 


// Formatting function for representative index row details 
function format(d) {
  // `d` is the original data object for the row
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; color:blue;">' +
    '<tr>' +
    '<td>Representative Index:</td>' +
    '<td>' + d.fullName + '</td>' +
    '</tr>' +
    '</table>';
}


$(document).ready(function() {
  
  $(".se-pre-con").fadeOut("slow"); // Loading screen
});



//Print icon function
function printer() {
 var schart = $('#scatterChart').highcharts();
//on print allow the scatter chart labels to overlap each other
 schart.series[0].update({
            dataLabels: {
                allowOverlap: true,
            }
 });
 schart.series[1].update({
            dataLabels: {
                allowOverlap: true,
            }
 });
 schart.series[2].update({
            dataLabels: {
                allowOverlap: true,
            }
 });
 window.print();
   }

var Dtable = $(document).ready(function() {

  // add text t0 source and notes
  $("#scatterNote").text("Notes: Five- and 10-year annualised return assumptions are in geometric terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in unhedged terms, with the exception of global ex-US treasuries. We use long-term volatility assumptions. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality.  ");
  $("#scatterSource").text("Source: BlackRock Investment Institute, " + sourceDate + ".");
  $("#rtnExptTableNote").text("Notes: Five- and 10-year annualised return assumptions are in geometric terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in unhedged terms, with the exception of global ex-US treasuries.  We use long-term volatility and correlation assumptions. Global equities are represented by the MSCI World ex USA Index in our correlation assumptions; global treasuries by the BofA Merrill Lynch Global Government ex US Index. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality. ");
  $("#rtnExptTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ".");
  $("#equityReturnAssumpTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ". Note: All component numbers are geometric. ");
  $("#equityMacroTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ".");
  $("#bondReturnAssumpTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ". Notes: UK figures are based on the General Index of Retail Prices (RPI). All component numbers are geometric.");
  $("#bondMacroTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ". Note: UK real rate figures are based on the General Index of Retail Prices (RPI), whereas EU and US real rates reference CPI inflation, as per the market norms.");
  $("#avgBondYieldsTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ". Notes: UK real rate figures are based on the General Index of Retail Prices (RPI), whereas EU and US real rates reference CPI inflation, as per the market norms. For clarity, we have inserted a line item showing our assumption for the difference between RPI and CPI inflation for the UK. ");
  $("#creditReturnAssumpTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ". Note: All component numbers are geometric.");
  $("#avgCreditYieldsTableSource").text("Source: BlackRock Investment Institute, " + sourceDate + ". Notes: All component numbers are geometric. The current and expected yields on equivalent government bonds differ from previous tables due to differences in duration.");
  $("#rtnAssumpChartSource").text("Source: BlackRock Investment Institute, " + sourceDate + ". Notes: The charts show how our five-year return assumptions have changed since 2009 from a UK currency perspective. Equities are represented by the MSCI World ex UK Index, and fixed income by the FTA Over 15-Year Gilt Index. We do not have historical assumptions for MSCI World equities and long-dated European and US government bonds, but would expect a similar pattern.");

 $("#printDate").text("BlackRock Investment Institute - " + sourceDate); //add the date to the print version
 $("#mainHeaderDate").text( sourceDate); //add the date to the onscreen version
 
//ADD MAIN RETURN EXPECTATION CHART
  var rtnTable = $('#rtnExptTable').DataTable({
      "data": assumpData,
       "columns": [{
          "data": "assetClass"
        }, {
          "data": "asset"
        }, {
          "data": "fiveER",
              "className": 'centreColumn',
          "render": function(data) {
            return toFixed(data,1) + '%';    //function called to control number of decimal places shown
          }
        }, {
          "data": "tenER",
              "className": 'centreColumn',
          "render": function(data) {
            return toFixed(data,1) + '%';
          }
        }, {
          "data": "eVol",
              "className": 'centreColumn',
          "render": function(data) {
            return toFixed(data,1) + '%';
          }
        }, {
          "data": "corrEq",
              "className": 'centreColumn',
          "render": function(data) {
            return toFixed(data,0) + '%';
          }
        }, {
          "data": "corrTr",
          "className": 'centreColumn',
          "render": function(data) {
            return toFixed(data,0) + '%';
          }
        }, {
          "className": 'details-control hidden-print',  //end column to add info icon to bring up full index details
          "orderable": false,
          "data": null,
          "defaultContent": ''
        }

      ],

      //colour rows by asset class
      "createdRow": function(row, data, dataIndex) {
        if (data.assetClass == "Fixed income") {
          $('td', row).css('background-color', 'rgba(85,40,115,0.25)');
        }
        if (data.assetClass == "Equities") {
          $('td', row).css('background-color', 'rgba(0,161,16,0.25)');
        }
        if (data.assetClass == "Alternatives") {
          $('td', row).css('background-color', 'rgba(0,114,143,0.25)');
        }
      },
      //Table display settings
      "paging": false,
      "order": [
        [0, "desc"]
      ],
      //add in a footer which replicates the table colun headers so that onscreen users can see headers when scrolled down
        fnInitComplete : function() {
    $("#rtnExptTable").append('<tfoot class="hidden-print"></tfoot>');
    $("#rtnExptTable thead tr").clone().appendTo($("#rtnExptTable tfoot")) ;
      },
      "info": false,
      bFilter: false,
      "bAutoWidth": false,
      bInfo: false
    }

  );

  //Handler topop out full index name when info button on far right of each row is clicked.
  $('#rtnExptTable tbody').on('click', 'td.details-control', function() {
    var tr = $(this).closest('tr');
    var row = rtnTable.row(tr);
    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass('shown');
    }
  });


  //Populate numerical columns for secondary tables from data input
  $('#equityReturnAssumpTable .target1').each(function(i) {
    $(this).html(toFixed(equityReturnAssumpTable[i],1) + '%'); //calls function to control decimals
  });

  $('#equityMacroTable .target1').each(function(i) {
   
    $(this).html(toFixed(equityMacroTable[i],1));
  });

  $('#bondReturnAssumpTable .target1').each(function(i) {
    $(this).html(toFixed(bondReturnAssumpTable[i],1) + '%');
  });

  $('#bondMacroTable .target1').each(function(i) {
    $(this).html(bondMacroTable[i]); //no function call for decimals as also contains text
  });

  $('#avgBondYieldsTable .target1').each(function(i) {
    $(this).html(avgBondYieldsTable[i]);
  });

  $('#creditReturnAssumpTable .target1').each(function(i) {
    $(this).html(toFixed(creditReturnAssumpTable[i],1) + '%');
  });

  $('#avgCreditYieldsTable .target1').each(function(i) {
    $(this).html(toFixed(avgCreditYieldsTable[i],1) + '%');
  });


  //FUNCTION TO UPDATE DATA ARRAY WHEN NEW CURRENCY IS SELECTED
  function buttonClicked() {

    if ($("#USD").attr('class') == "cbutton active") {
      $.each(assumpData, function(i) {
        this.fullName = this.USDfullName;
        this.name = this.USDname;
        this.asset = this.USDasset;
        this.fiveER = this.USDfiveER;
        this.tenER = this.USDtenER;
        this.eVol = this.USDeVol;
        this.corrEq = this.USDcorrEq;
        this.corrTr = this.USDcorrTr;
      });
    } else {

      if ($("#EUR").attr('class') == "cbutton active") {
        $.each(assumpData, function(i) {
          this.fullName = this.EURfullName;
          this.name = this.EURname;
          this.asset = this.EURasset;
          this.fiveER = this.EURfiveER;
          this.tenER = this.EURtenER;
          this.eVol = this.EUReVol;
          this.corrEq = this.EURcorrEq;
          this.corrTr = this.EURcorrTr;
        });
      } else {
        if ($("#GBP").attr('class') == "cbutton active") {
          $.each(assumpData, function(i) {
            this.fullName = this.GBPfullName;
            this.name = this.GBPname;
            this.asset = this.GBPasset;
            this.fiveER = this.GBPfiveER;
            this.tenER = this.GBPtenER;
            this.eVol = this.GBPeVol;
            this.corrEq = this.GBPcorrEq;
            this.corrTr = this.GBPcorrTr;
          });
        } else { 
          $.each(assumpData, function(i) {
            this.fullName = this.CHFfullName;
            this.name = this.CHFname;
            this.asset = this.CHFasset;
            this.fiveER = this.CHFfiveER;
            this.tenER = this.CHFtenER;
            this.eVol = this.CHFeVol;
            this.corrEq = this.CHFcorrEq;
            this.corrTr = this.CHFcorrTr;
          });
        }
      }
    }
//UPDATE THE MAIN TABLE WITH THE NEW DATA
    rtnTable.clear().draw();
    rtnTable.rows.add(assumpData); // Add new data
    rtnTable.columns.adjust().draw(); // Redraw the table
  }


 var scatterData;
  var fixedIncomeScatterData = [];
  var equityScatterData = [];
  var altScatterData = [];

//FUNCTION TO UPDATE THE SCATTER DATA
function updateScatterData(){
  scatterData = assumpData;
  //check which time period is selected and adjust data
 if ($("#tenYear").attr('class') == "sbutton active") {
  $.each(scatterData, function(i, item) {
    item.y = item.tenER;
    item.x = item.eVol;
  });
 }  else {
     $.each(scatterData, function(i, item) {
    item.y = item.fiveER;
    item.x = item.eVol;
  });
 }
  //strip out asset classes into individual arrays so they can be color coded / have legend on scatter chart
  id = "Fixed income";
  fixedIncomeScatterData = $.grep(scatterData, function(data, index) {
    return data.assetClass == id;
  });
  id = "Equities";
  equityScatterData = $.grep(scatterData, function(data, index) {
    return data.assetClass == id;
  });
  id = "Alternatives";
  altScatterData = $.grep(scatterData, function(data, index) {
    return data.assetClass == id;
  });

}

//FUNCTION TO UPDATE THE SCATTER CHART
  function updateScatterChart() {
    var chart = $('#scatterChart').highcharts();
    chart.series[0].update({
      name: 'Fixed Income'
    });
    chart.series[0].setData(fixedIncomeScatterData);
    chart.series[1].update({
      name: 'Equities'
    });
    chart.series[1].setData(equityScatterData);
    chart.series[2].update({
      name: 'Alternatives'
    });
    chart.series[2].setData(altScatterData);
  }
  



//CONTROLS FOR CURRENCY BUTTONS
  $("#USD").click(function() {
    //change classes
    if ($(this).attr('class') !== "active") {
      $(".cbutton").removeClass('active');
      $(".cbutton").addClass('hidden-print');
      $(this).addClass('active');
      $(this).removeClass('hidden-print');
      //update the notes for the scatter chart and main table to reflect the currency change
  $("#rtnExptTableNote").text("Notes: Five- and 10-year annualised return assumptions are in geometric terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in unhedged terms, with the exception of global ex-US treasuries.  We use long-term volatility and correlation assumptions. Global equities are represented by the MSCI World ex USA Index in our correlation assumptions; global treasuries by the BofA Merrill Lynch Global Government ex US Index. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality. ");
  $("#scatterNote").text("Notes: Five- and 10-year annualised return assumptions are in geometric terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in unhedged terms, with the exception of global ex-US treasuries. We use long-term volatility assumptions. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality.  ");
      buttonClicked(); //Update table
      updateScatterData(); //update scatter data
      updateScatterChart(); //update scatter chart
      return false; // stop browser from jumping
    }
  });

  $("#EUR").click(function() {
    if ($(this).attr('class') !== "active") {
      $(".cbutton").removeClass('active');
      $(".cbutton").addClass('hidden-print');
      $(this).addClass('active');
      $(this).removeClass('hidden-print');
      $("#rtnExptTableNote").text("Notes: Five- and 10-year annualised return assumptions are in arithmetic terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in hedged terms, with the exception of EM equity and local-currency EM debt. We use long-term volatility and correlation assumptions. Global equities are represented by the MSCI World ex EMU Index in our correlation assumptions; global treasuries by the BofA Merrill Lynch Global Government ex Euro Governments Index. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality. ");
     $("#scatterNote").text("Notes: Five- and 10-year annualised return assumptions are in arithmetic terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in hedged terms, with the exception of EM equity and local-currency EM debt. We use long-term volatility assumptions. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality.  ");
    buttonClicked();
        updateScatterData();
      updateScatterChart();
      return false;
    }
  });

  $("#GBP").click(function() {
    if ($(this).attr('class') !== "active") {
       $(".cbutton").removeClass('active');
      $(".cbutton").addClass('hidden-print');
      $(this).addClass('active');
      $(this).removeClass('hidden-print');
      $("#rtnExptTableNote").text("Notes: Five- and 10-year annualised return assumptions are in arithmetic terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in hedged terms, with the exception of EM equity and local-currency EM debt. We use long-term volatility and correlation assumptions. Global equities are represented by the MSCI World ex UK Index in our correlation assumptions; global treasuries by the BofA Merrill Lynch Global Government ex UK Index. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality. ");
      $("#scatterNote").text("Notes: Five- and 10-year annualised return assumptions are in arithmetic terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in hedged terms, with the exception of EM equity and local-currency EM debt. We use long-term volatility assumptions. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality.  ");
      buttonClicked();
        updateScatterData();
      updateScatterChart();
      return false;
    }
  });

  $("#CHF").click(function() {
    if ($(this).attr('class') !== "active") {
     $(".cbutton").removeClass('active');
      $(".cbutton").addClass('hidden-print');
      $(this).addClass('active');
      $(this).removeClass('hidden-print');
      $("#rtnExptTableNote").text("Notes: Five- and 10-year annualised return assumptions are in arithmetic terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in hedged terms, with the exception of EM equity and local-currency EM debt. We use long-term volatility and correlation assumptions. Global equities are represented by the MSCI World ex Switzerland Index in our correlation assumptions; global treasuries by the Barclays Global Aggregate Index. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality. ");
      $("#scatterNote").text("Notes: Five- and 10-year annualised return assumptions are in arithmetic terms. Return assumptions are total nominal returns. Return assumptions for all asset classes are shown in hedged terms, with the exception of EM equity and local-currency EM debt. We use long-term volatility assumptions. We break down each asset class into factor exposures and analyse those factors’ historical volatilities and correlations over the past 15 years. We combine the historical volatilities with the current factor makeup of each asset class to arrive at our forward-looking assumptions. This approach takes into account how asset classes evolve over time. Example: Some fixed income indices are of shorter or longer duration than they were in the past. Our forward-looking assumptions reflect these changes, whereas a volatility calculation based only on historical monthly index returns would fail to capture the shifts. We have created BlackRock proxies to represent asset classes where historical data is either lacking or of poor quality.  ");
       buttonClicked();
        updateScatterData();
      updateScatterChart();
      return false;
    }
  });


//CONTROL FOR TIME PERIOD CHANGE ON SCATTER CHART


  $("#fiveYear").click(function() {
    //change classes
    if ($(this).attr('class') !== "active") {
       $('#comparisonChart').hide();
      $('#scatterChart').fadeIn();
      $(".sbutton").removeClass('active');
      $(".sbutton").addClass('hidden-print');
      $(this).addClass('active');
      $(this).removeClass('hidden-print');
       updateScatterData();//update scatter data
      updateScatterChart(); //update scatter chart
      return false;

    }
  });

  $("#tenYear").click(function() {
    if ($(this).attr('class') !== "active") {
      $('#comparisonChart').hide(); 
       $('#scatterChart').fadeIn();
    $(".sbutton").removeClass('active');
      $(".sbutton").addClass('hidden-print');
      $(this).addClass('active');
      $(this).removeClass('hidden-print');
       updateScatterData(); //update scatter data
      updateScatterChart(); //update scatter chart
      return false;

    }
  });
  
   $("#comparison").click(function() {
      if ($(this).attr('class') !== "active") {
      $('#scatterChart').hide();
       $('#comparisonChart').fadeIn();
    $(".sbutton").removeClass('active');
      $(".sbutton").addClass('hidden-print');
      $(this).addClass('active');
      $(this).removeClass('hidden-print');

 

     return false;
     
      }
   });
   



  // TIME SERIES CHART
  timeSeries = tsData;
  $(function() {
 //pull out date and series
    dateSeries = timeSeries.date; 
    equitiesSeries = timeSeries.equities;
    fixedIncomeSeries = timeSeries.fixedIncome;

    $('#equityChart').highcharts({
      chart: {
        height: 400,
    
        marginRight: 30,
         spacingTop: -10,
        spacingLeft: 0,
        type: 'column'
      },
      title: {
        text: '',
        align: "left",
        style: {
          fontSize: '15px',
          fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
          color: 'rgb(79, 78, 80)'
        }
      },
      legend: {
              enabled: true,
              marginRight: 100,
       title: {
          text: '<b>Asset Class </b> <span  style="font-size: 13px; color: #337ab7; font-weight: normal"> (Click to hide)</span>',
          style: {
            fontSize: '14px',
            fontWeight: 'normal',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          }
        },
           align: 'left',
           verticalAlign: 'top',
        itemStyle: {
          fontSize: '14px',
          fontWeight: 'normal',
          fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
          color: '#337ab7'
        }
      },
      credits: {
        enabled: false
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: dateSeries,
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)',
            overflow: 'justify'
          }
        },
        tickInterval: 4,
        crosshair: true
      },

      yAxis: {
        gridLineColor: 'rgb(225,225,225)',
        title: {
          text: 'Annualised Nominal Return',
          align: 'middle',
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          }
        },
        labels: {
          yAxis: {
            gridLineColor: 'rgb(225,225,225)',
            title: {
              text: '',
              align: 'middle',
              style: {
                fontSize: '12px',
                fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
                color: 'rgb(79, 78, 80)'
              }
            },
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
                color: 'rgb(79, 78, 80)'
              },
              overflow: 'justify'
            },
            opposite: true
          },
          formatter: function() {
            return this.value + '%';
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px; font-family: AkkuratProRegular, Arial, Sans-Serif; color :rgb(79, 78, 80)">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0;font-family : AkkuratProRegular, Arial, Sans-Serif;">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          groupPadding: 0.075,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Equities',
        data: equitiesSeries,
        color: 'rgb(0,161,61)'
      }, {
        name: 'Fixed Income',
        data: fixedIncomeSeries,
        color: 'rgb(85,40,115)'
      }]
    });
  });


  // SCATTER CHART
updateScatterData(); //set up data on initial run
$(function () {

   $('#scatterChart').highcharts({
      chart: {
        type: 'scatter',
        height: 500,
              spacingTop: 30,
              marginRight: 30,
              plotBorderWidth: 0,
        animation: {
          duration: 1000
        },
        zoomType: 'xy'
      },
   legend: {
        enabled: true,
       title: {
          text: '<b>Asset Class </b> <span style="font-size: 13px; color: #337ab7; font-weight: normal"> (Click to hide)</span>',
          style: {
            fontSize: '14px',
            fontWeight: 'normal',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          }
        },
           align: 'left',
        verticalAlign: 'top',
        x: 0,
        y: -30,
        itemStyle: {
          fontSize: '14px',
          fontWeight: 'normal',
          fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
          color: '#337ab7'
        }
      },
      title: {
        text: ''
      },

      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        tickInterval: 5,
        gridLineWidth: 1,
        title: {
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          },
          text: 'Annualised Volatility'
        },
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          },
          format: '{value} %'
        }
      },
      yAxis: {
        max: 10,
            min:0,
        title: {
          text: 'Annualised Nominal Return',
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          },
        },
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          },
          format: '{value} %'
        },
        maxPadding: 0.2
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<div style="font-size:14px; font-family : AkkuratProRegular, Arial, Sans-Serif; color :rgb(79, 78, 80)">{point.asset}</div><br>' +
          '<div style="font-size:12px; font-family : AkkuratProRegular, Arial, Sans-Serif; color :rgb(79, 78, 80)">Return: {point.y:.1f}%' + '<br>Volatility: {point.x}%</div>',

        footerFormat: '</table>',
        followPointer: true
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
           // allowOverlap: true,
            //padding: 0,
            color: 'rgb(79, 78, 80)',
            style: {
              fontWeight: 'normal',
              fontFamily: 'AkkuratProRegular, Arial, Sans-Serif'
            },
            format: '{point.name}'
          }
        }
      },
      series: [{
        data: fixedIncomeScatterData,
        color: 'rgb(85,40,115)',
        name: 'Fixed Income',
        marker: {
          symbol: 'circle'
        }
      }, {
        data: equityScatterData,
        color: 'rgb(0,161,61)',
        name: 'Equities',
        marker: {
          symbol: 'circle'
        }
      }, {
        data: altScatterData,
        color: 'rgb(0,114,143)',
        name: 'Alternatives',
        marker: {
          symbol: 'circle'
        }
      }]

    });
 
 
});

//HIDDEN COMPARISON CHART

 var comparisonDataName = [];
 var comparisonData = [];
 var comparisonData1Q = [];
 var comparisonDataColor = [];
 //   var wid = $('#scatterChart').width();
  
 
  $.each(scatterData, function(i, item) {
    comparisonDataName.push(item.name);
   comparisonData.push(item.fiveER);
   comparisonData1Q.push(item.tenER);
   comparisonDataColor.push(item.color);
  });



$(function () {
  
 
    $('#comparisonChart').highcharts({
        chart: {
            type: 'column',
             height: 500,
      
              spacingTop: 30,
              marginRight: 30,
              plotBorderWidth: 0,
        },
      credits: {
        enabled: false
      },
        legend: {
              enabled: true,
              marginRight: 100,
      
           align: 'left',
           verticalAlign: 'top',
        itemStyle: {
          fontSize: '14px',
          fontWeight: 'normal',
          fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
          color: '#337ab7'
        }
      },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: comparisonDataName ,
            crosshair: true,
             labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          },
          rotation: 270
  
        }
        },
        yAxis: {
            min: 0,
            title: {
          text: 'Annualised Nominal Return',
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          },
        },
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratProRegular, Arial, Sans-Serif',
            color: 'rgb(79, 78, 80)'
          },
          format: '{value} %'
        },
        
        },
        tooltip: {
            headerFormat: '<span style="font-size:14px; font-family : AkkuratProRegular, Arial, Sans-Serif; color :rgb(79, 78, 80)">{point.key}</span><table>',
            pointFormat: '<tr><td style="font-size:14px; font-family : AkkuratProRegular, Arial, Sans-Serif; color :rgb(79, 78, 80)">{series.name}: </td>' +
                '<td style="font-size:14px; font-family : AkkuratProRegular, Arial, Sans-Serif; color :rgb(79, 78, 80)"><b>{point.y:.1f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,

            },
            
            series: {
               colorByPoint: true,
               colors: comparisonDataColor,
                  marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 2,
                      radius: 6,
                    lineColor: null // inherit from series
                }
            },
            
            
        },
         series: [{
            name: 'This Quarter',
            data: comparisonData
        
        },
        {
            name: 'Last Quarter',
            data: comparisonData1Q,
            type: 'spline'
        
        }]
    });
});




});


  


