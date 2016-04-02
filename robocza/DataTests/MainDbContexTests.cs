using Microsoft.VisualStudio.TestTools.UnitTesting;
using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Tests
{
    [TestClass()]
    public class MainDbContexTests
    {
        [TestMethod()]
        public void MainDbContexTest()
        {
            MainDbContex db = new MainDbContex();

            var track = db.Tracks.First(x => x.Id == 1);
            CollectionAssert.AreEqual(track.BusStopsIds,new[] {1, 2, 3});
        }
    }
}