using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarionetteTips.Extensions
{
    public static class MyExtensions
    {
        public static T? FirstOrNull<T>(this IEnumerable<T> sequence) where T : struct
        {
            foreach (T item in sequence)
                return item;
            return null;
        }
    }
}