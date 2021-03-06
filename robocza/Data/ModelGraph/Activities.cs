//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data.ModelGraph
{
    using System;
    using System.Collections.Generic;
    
    public partial class Activities
    {
        public int Id { get; set; }
        public int ActivityType { get; set; }
        public System.DateTime Date { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public Nullable<int> Bus_Id { get; set; }
        public Nullable<int> BusStop_Id { get; set; }
        public Nullable<int> Course_Id { get; set; }
        public string User_Id { get; set; }
        public string AdditionalInfo { get; set; }
    
        public virtual AspNetUsers AspNetUsers { get; set; }
        public virtual Buses Buses { get; set; }
        public virtual BusStops BusStops { get; set; }
        public virtual Courses Courses { get; set; }
    }
}
