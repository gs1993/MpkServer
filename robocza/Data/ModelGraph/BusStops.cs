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
    
    public partial class BusStops
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BusStops()
        {
            this.Activities = new HashSet<Activities>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string LocalizationString { get; set; }
        public bool GotMachine { get; set; }
        public bool GotKiosk { get; set; }
        public int BusStopType { get; set; }
        public System.DateTime LastControl { get; set; }
        public int BusStopStatus { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Activities> Activities { get; set; }
    }
}
