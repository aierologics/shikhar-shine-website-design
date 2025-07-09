
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MandatoryPublicDisclosure = () => {
  const schoolDetails = [
    { sno: 1, information: "NAME OF THE SCHOOL", details: "SHIKHAR SHISHU SADAN" },
    { sno: 2, information: "AFFILIATION NUMBER", details: "2130272" },
    { sno: 3, information: "SCHOOL CODE", details: "81080" },
    { sno: 4, information: "COMPLETE ADDRESS WITH PIN CODE", details: "SHIKHAR SHISHU SADAN, KSHATRIYA NAGAR,DHAMPUR, BIJNOR, UTTAR PRADESH - 246761" },
    { sno: 5, information: "PRINCIPAL NAME & QUALIFICATION", details: "MR. V.K. RANA (M.SC., B.ED, M.PHILL)" },
    { sno: 6, information: "SCHOOL EMAIL ID", details: "shikharschool1964@rediffmail.com" },
    { sno: 7, information: "CONTACT DETAILS", details: "+91 9837774888" }
  ];

  const documents = [
    { sno: 1, document: "COPIES OF AFFILIATION/UP GRADATION LETTER AND RECENT EXTENSION OF AFFILIATION IF ANY" },
    { sno: 2, document: "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE" },
    { sno: 3, document: "COPY OF NO OBJECTION CERTIFICATE(NOC) ISSUED, IF APPLICABLE BY THE STATE GOVT/UT" },
    { sno: 4, document: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT,2009, AND ITS RENEWAL IF APPLICABLE" },
    { sno: 5, document: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING BLOCK" },
    { sno: 6, document: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY" },
    { sno: 7, document: "COPY OF DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL." },
    { sno: 8, document: "COPIES OF VALID WATER, HEALTH & SANITATION CERTIFICATES." },
    { sno: 9, document: "Book Declaration" }
  ];

  const academicDocuments = [
    { sno: 1, document: "FEE STRUCTURE OF THE SCHOOL" },
    { sno: 2, document: "ANNUAL ACADEMIC CALENDAR" },
    { sno: 3, document: "LIST OF SCHOOL MANAGEMENT COMMITTEE(SMC)" },
    { sno: 4, document: "LIST OF PARENT TEACHERS ASSOCIATION (PTA) MEMBERS" },
    { sno: 5, document: "LAST THREE YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABLILITY" }
  ];

  const class10Results = [
    { year: "2019", registered: 135, passed: 127, percentage: "94.07 %", remarks: "" },
    { year: "2020", registered: 149, passed: 145, percentage: "97.31 %", remarks: "" },
    { year: "2021", registered: 137, passed: 137, percentage: "100 %", remarks: "" }
  ];

  const class12Results = [
    { year: "2019", registered: 117, passed: 107, percentage: "91.45", remarks: "" },
    { year: "2020", registered: 131, passed: 112, percentage: "85.49", remarks: "" },
    { year: "2021", registered: 161, passed: 160, percentage: "100 %", remarks: "" }
  ];

  const staffDetails = [
    { sno: 1, information: "PRINCIPAL", details: "01" },
    { sno: 2, information: "TOTAL NUMBER OF TEACHERS", details: "60" },
    { sno: 3, information: "PGT", details: "12" },
    { sno: 4, information: "TGT", details: "24" },
    { sno: 5, information: "PRT", details: "24" },
    { sno: 6, information: "TEACHER'S SECTION RATIO", details: "1.5" },
    { sno: 7, information: "DETAILS OF SPECIAL EDUCATOR", details: "APPOINTED" },
    { sno: 8, information: "DETAILS OF COUNSELLOR AND WELLNESS TEACHER", details: "APPOINTED" }
  ];

  const infrastructure = [
    { sno: 1, information: "TOTAL CAMPUS AREA OF THE SCHOOL ( IN SQUARE METER)", details: "40468.564" },
    { sno: 2, information: "NO. & SIZE OF CLASS ROOMS ( IN SQ METER)", details: "48 (7.625x6.1)" },
    { sno: 3, information: "NO. & SIZE OF LABORATORIES INCLUDING COMPUTER LABS( IN SQM)", details: "8 (9.15x6.71)" },
    { sno: 4, information: "INTERNET FACILITY(Y/N)", details: "Yes" },
    { sno: 5, information: "NO. OF GIRLS TOILET", details: "10" },
    { sno: 6, information: "NO. OF BOYS TOILET", details: "10" },
    { sno: 7, information: "LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL", details: "Click Here" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-school-blue hover:text-school-orange transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-school-blue mb-4">Mandatory Public Disclosure</h1>
            <p className="text-xl text-gray-600">Shikhar Shishu Sadan Sr. Sec. School, Dhampur(Bijnore)</p>
          </div>

          {/* School Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-school-blue">School Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">S.NO</TableHead>
                      <TableHead className="font-bold text-school-blue">INFORMATION</TableHead>
                      <TableHead className="font-bold text-school-blue">DETAILS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schoolDetails.map((item) => (
                      <TableRow key={item.sno}>
                        <TableCell className="font-medium">{item.sno}</TableCell>
                        <TableCell>{item.information}</TableCell>
                        <TableCell>{item.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Documents and Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-school-blue">Documents and Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">S.NO</TableHead>
                      <TableHead className="font-bold text-school-blue">DOCUMENTS/INFORMATION</TableHead>
                      <TableHead className="font-bold text-school-blue">DOCUMENTS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((item) => (
                      <TableRow key={item.sno}>
                        <TableCell className="font-medium">{item.sno}</TableCell>
                        <TableCell>{item.document}</TableCell>
                        <TableCell>
                          <button className="text-school-blue hover:text-school-orange flex items-center">
                            Click Here
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Result and Academics */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-school-blue">Result and Academics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">S.NO</TableHead>
                      <TableHead className="font-bold text-school-blue">DOCUMENT/INFORMATION</TableHead>
                      <TableHead className="font-bold text-school-blue">DOCUMENTS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {academicDocuments.map((item) => (
                      <TableRow key={item.sno}>
                        <TableCell className="font-medium">{item.sno}</TableCell>
                        <TableCell>{item.document}</TableCell>
                        <TableCell>
                          <button className="text-school-blue hover:text-school-orange flex items-center">
                            Click Here
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Class X Results */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-school-blue">Result Class - X</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">S.NO</TableHead>
                      <TableHead className="font-bold text-school-blue">Year</TableHead>
                      <TableHead className="font-bold text-school-blue">NO. OF REGISTERED STUDENTS</TableHead>
                      <TableHead className="font-bold text-school-blue">NO. OF STUDENTS PASSED</TableHead>
                      <TableHead className="font-bold text-school-blue">PASS PERCENTAGE</TableHead>
                      <TableHead className="font-bold text-school-blue">REMARKS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {class10Results.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>{item.registered}</TableCell>
                        <TableCell>{item.passed}</TableCell>
                        <TableCell className="font-semibold text-green-600">{item.percentage}</TableCell>
                        <TableCell>{item.remarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Class XII Results */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-school-blue">Result Class - XII</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">S.NO</TableHead>
                      <TableHead className="font-bold text-school-blue">YEAR</TableHead>
                      <TableHead className="font-bold text-school-blue">NO. OF REGISTERED STUDENTS</TableHead>
                      <TableHead className="font-bold text-school-blue">NO. OF STUDENTS PASSED</TableHead>
                      <TableHead className="font-bold text-school-blue">PASS PERCENTAGE</TableHead>
                      <TableHead className="font-bold text-school-blue">REMARKS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {class12Results.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>{item.registered}</TableCell>
                        <TableCell>{item.passed}</TableCell>
                        <TableCell className="font-semibold text-green-600">{item.percentage}</TableCell>
                        <TableCell>{item.remarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Staff Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-school-blue">Staff (Teaching)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">S.NO</TableHead>
                      <TableHead className="font-bold text-school-blue">INFORMATION</TableHead>
                      <TableHead className="font-bold text-school-blue">DETAILS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffDetails.map((item) => (
                      <TableRow key={item.sno}>
                        <TableCell className="font-medium">{item.sno}</TableCell>
                        <TableCell>{item.information}</TableCell>
                        <TableCell>{item.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* School Infrastructure */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-school-blue">School Infrastructure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">S.NO</TableHead>
                      <TableHead className="font-bold text-school-blue">INFORMATION</TableHead>
                      <TableHead className="font-bold text-school-blue">DETAILS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {infrastructure.map((item) => (
                      <TableRow key={item.sno}>
                        <TableCell className="font-medium">{item.sno}</TableCell>
                        <TableCell>{item.information}</TableCell>
                        <TableCell>
                          {item.details === "Click Here" ? (
                            <button className="text-school-blue hover:text-school-orange flex items-center">
                              Click Here
                              <ExternalLink className="ml-1 h-4 w-4" />
                            </button>
                          ) : (
                            item.details
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MandatoryPublicDisclosure;
