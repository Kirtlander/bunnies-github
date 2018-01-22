using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    public class BunniesController : Controller
    {
        private static readonly List<Bunny> Bunnies = new List<Bunny>
        {
            new Bunny    {
                Id = 1,
                Name = "Thumper",
                Description = "Cute little fellow that loves to entertain us with his binkies",
                ImageUrl = "thumper.jpg",
                Hidden = false,
                Age =  2,
                Likes = 0
            },
            new Bunny    {
                Id = 2,
                Name = "Elsa",
                Description = "She sure doesn't have a cold, frozen heart.",
                ImageUrl = "elsa.jpg",
                Hidden = false,
                Age =  1,
                Likes = 1
            },
            new Bunny    {
                Id = 3,
                Name = "Pippin",
                Description = "Grumpy bunny that will steal your heart.",
                ImageUrl = "pippin.jpg",
                Hidden = false,
                Age =  0.5f,
                Likes = 0
            },
            new Bunny    {
                Id = 4,
                Name = "Turbo",
                Description = "Try to catch this guy when he launches into his bunny 500.",
                ImageUrl = "turbo.jpg",
                Hidden = false,
                Age =  4,
                Likes = 0
            },
        };

        [HttpGet]
        public IEnumerable<Bunny> Get()
        {
            return Bunnies;
        }

        [HttpDelete("{id}")]public bool Delete(int id)
        {
            var bunny = Bunnies.FirstOrDefault(b => b.Id == id);
            if (bunny == null)
            {
                return false;
            }
            bunny.Hidden = true;
            return true;
        }

    }
}
