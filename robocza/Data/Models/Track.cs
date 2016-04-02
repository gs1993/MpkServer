using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Track
    {
        public int Id { get; set; }

        public string Tracks { get; set; }

        public bool IsArchive { get; set; }

        [NotMapped]
        public int[] TracksId
        {
            get { return Tracks.Split(';').Select(x => Convert.ToInt32(x)).ToArray(); }
            set { Tracks = String.Join(";", value); }
        }
    }
}
