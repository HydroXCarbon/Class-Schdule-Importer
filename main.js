const {scrapPage} = require('./scrap.js');

const {test} = require('./test.js');

const {printReport} = require('./report.js');

async function main(){
    //if (process.argv.length < 3){
    //  console.log('no website provided')
    //}
    //if (process.argv.length > 3){
    //  console.log('too many arguments provided')
    //}
  
    //const targetedURL = process.argv[2]

    //test()
    //return
  
    const targetedURL = 'https://smartedu.mahidol.ac.th//Enrollment/module/Reports/ReportRegistrationInfo/ReportInvoice.aspx?action=UiGetListStudentResultRegistration'
    
    console.log(`Targeted URL : ${targetedURL}...`)

    const subjectList = await scrapPage( targetedURL )

    //printReport(pages)
}

main()