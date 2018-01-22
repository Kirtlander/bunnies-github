using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class Bunny
    {
        //id: number;
        //name: string;
        //description: string,
        //imageUrl: string;
        //hidden: boolean;
        //age: number;
        ////dob: Date;
        //likes: number;
        //isMostPopular: boolean; 

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public bool Hidden { get; set; }

        public float Age { get; set; }

        public int Likes { get; set; }

        public bool IsMostPopular { get; set; }

    }
}
