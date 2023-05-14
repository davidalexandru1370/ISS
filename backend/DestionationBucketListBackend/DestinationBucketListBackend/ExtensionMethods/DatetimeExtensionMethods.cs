namespace DestinationBucketListBackend.ExtensionMethods;

public static class DatetimeExtensionMethods
{
    public static DateTime ConvertFromUnixTimeStamp(this DateTime dt, int amount) 
    {
        DateTime startDate = new DateTime(1970, 1, 1, 0, 0, 0, 0);
        startDate = startDate.AddSeconds(amount).ToLocalTime();
        return startDate;
    }
}