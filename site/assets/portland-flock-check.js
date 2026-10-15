"use strict";
/**
 * Source: Portland City Code §§13.40.020(A), 13.40.040(A, D)
 * https://www.portland.gov/code/13/40
 * A conservative educational screen, not a zoning/permit determination.
 */
function screenPortlandFlock({lotSqFt,adultFowl,youngFowl,multipleUnits=false}){
  if(!Number.isSafeInteger(lotSqFt)||lotSqFt<1||lotSqFt>100000000)throw new RangeError("Enter a valid lot size in square feet.");
  if(!Number.isSafeInteger(adultFowl)||adultFowl<0||adultFowl>500)throw new RangeError("Enter a valid count for older birds.");
  if(!Number.isSafeInteger(youngFowl)||youngFowl<0||youngFowl>500)throw new RangeError("Enter a valid count for young birds.");
  const standardMax=lotSqFt>=10000?6:4;
  const withinStandardCount=adultFowl<=standardMax&&youngFowl<=4;
  return {
    standardMax, withinStandardCount, youngMax:4,
    shelterOrPenSqFt:adultFowl*10,
    agriculturalExceptionRequiresReview:lotSqFt>=20000,
    multipleUnits:!!multipleUnits
  };
}
if(typeof module!=="undefined"&&module.exports)module.exports={screenPortlandFlock};
if(typeof document!=="undefined"){
  const form=document.getElementById("portlandFlockForm");
  const output=document.getElementById("portlandFlockResult");
  if(form&&output){
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const paragraphs=[];
      let result;
      try{
        result=screenPortlandFlock({
          lotSqFt:Number(form.elements.lotSqFt.value),
          adultFowl:Number(form.elements.adultFowl.value),
          youngFowl:Number(form.elements.youngFowl.value),
          multipleUnits:form.elements.multipleUnits.checked
        });
      }catch(error){
        output.hidden=false;
        output.className="cc-qc-result cc-qc-review";
        output.replaceChildren();
        const msg=document.createElement("p");
        msg.textContent=error.message;
        output.append(msg);
        return;
      }
      paragraphs.push("Standard lot-size tier: up to "+result.standardMax+" small domestic fowl plus up to 4 additional small domestic fowl younger than 12 weeks (Portland Code §13.40.020(A)).");
      paragraphs.push(result.withinStandardCount
        ?"Your input is within the standard NUMBER limits only. This is not a legal approval or a check of rooster, zoning, nuisance or coop placement rules."
        :"At least one entered bird count exceeds the ordinary tier. Do not assume the flock is allowed; verify the official code and zoning.");
      paragraphs.push("For "+form.elements.adultFowl.value+" fowl older than 12 weeks, §13.40.040(A) calls for at least "+result.shelterOrPenSqFt+" sq ft of usable shelter OR pen area. This is a city-code threshold, not a recommendation to treat indoor and outdoor space as interchangeable for bird welfare.");
      paragraphs.push("Livestock facility structures: at least 3 ft from side/rear property lines and 10 ft from the front property line (§13.40.040(D)).");
      if(result.multipleUnits)paragraphs.push("More than one residential unit: also check the 15-ft separation from residential-unit walls and specified outdoor activity spaces, plus the required confinement of livestock (§13.40.040(C–D)).");
      if(result.agriculturalExceptionRequiresReview)paragraphs.push("A 20,000+ sq-ft lot does NOT automatically qualify for unlimited birds. The special provision also requires zoning that allows agricultural use or an approved conditional use (§13.40.020(A)).");
      output.hidden=false;
      output.className="cc-qc-result "+(result.withinStandardCount?"cc-qc-within":"cc-qc-over");
      output.replaceChildren();
      const heading=document.createElement("h3");
      heading.textContent=result.withinStandardCount?"Count check: within ordinary tier":"Count check: requires further review";
      output.append(heading);
      for(const statement of paragraphs){const p=document.createElement("p");p.textContent=statement;output.append(p);}
    });
  }
}
