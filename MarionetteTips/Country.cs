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
    public partial class Country
    {
        public Country()
        {
            this.City = new HashSet<City>();
            this.Competition = new HashSet<Competition>();
        }
    
    		[DataMember]
    	    public int ID { get; set; }
    		[DataMember]
    	    public string Title { get; set; }
    		[DataMember]
    	    public string CountryCode { get; set; }
    	    public string ModifiedBy { get; set; }
    	    public System.DateTime ModifiedDate { get; set; }
    	    public string CreatedBy { get; set; }
    	    public System.DateTime CreatedDate { get; set; }
    		[DataMember]
    	    public string FlagImg { get; set; }
    
        public virtual ICollection<City> City { get; set; }
        public virtual ICollection<Competition> Competition { get; set; }
    }
}
