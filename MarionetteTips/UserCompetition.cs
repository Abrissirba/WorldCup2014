//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MarionetteTips
{
    using System;
    using System.Collections.Generic;
    
    using System.Runtime.Serialization;
    [DataContract]
    public partial class UserCompetition
    {
    		[DataMember]
    	    public int ID { get; set; }
    		[DataMember]
    	    public int UserID { get; set; }
    		[DataMember]
    	    public int CompetitionID { get; set; }
    	    public string ModifiedBy { get; set; }
    	    public System.DateTime ModifiedDate { get; set; }
    	    public string CreatedBy { get; set; }
    	    public System.DateTime CreatedDate { get; set; }
    
        public virtual Competition Competition { get; set; }
        public virtual User User { get; set; }
    }
}