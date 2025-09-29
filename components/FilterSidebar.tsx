'use client';

import { FilterState } from '@/types/pet';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

export function FilterSidebar({ filters, onFiltersChange, resultsCount }: FilterSidebarProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: 'all',
      age: 'all',
      size: 'all',
      location: 'all',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  return (
    <Card className="sticky top-24 animate-slideInLeft hover-lift transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold hover:text-orange-600 transition-colors duration-300">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-orange-600 hover:text-orange-700 hover-bounce btn-animate">
              Clear All
            </Button>
          )}
        </div>
        <Badge variant="secondary" className="w-fit animate-zoomIn animate-delay-200 hover-scale">
          {resultsCount} pets found
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Pet Type */}
        <div className="space-y-2 animate-slideInLeft animate-delay-100 hover:scale-105 transition-transform duration-300">
          <label className="text-sm font-medium text-gray-700">Pet Type</label>
          <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="cat">Cats</SelectItem>
              <SelectItem value="rabbit">Rabbits</SelectItem>
              <SelectItem value="bird">Birds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age */}
        <div className="space-y-2 animate-slideInLeft animate-delay-200 hover:scale-105 transition-transform duration-300">
          <label className="text-sm font-medium text-gray-700">Age</label>
          <Select value={filters.age} onValueChange={(value) => updateFilter('age', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="puppy">Puppy/Kitten</SelectItem>
              <SelectItem value="young">Young</SelectItem>
              <SelectItem value="adult">Adult</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="space-y-2 animate-slideInLeft animate-delay-300 hover:scale-105 transition-transform duration-300">
          <label className="text-sm font-medium text-gray-700">Size</label>
          <Select value={filters.size} onValueChange={(value) => updateFilter('size', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2 animate-slideInLeft animate-delay-400 hover:scale-105 transition-transform duration-300">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
              <SelectItem value="Los Angeles, CA">Los Angeles, CA</SelectItem>
              <SelectItem value="Austin, TX">Austin, TX</SelectItem>
              <SelectItem value="Miami, FL">Miami, FL</SelectItem>
              <SelectItem value="Denver, CO">Denver, CO</SelectItem>
              <SelectItem value="Portland, OR">Portland, OR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Facts */}
        <div className="pt-6 border-t animate-slideInLeft animate-delay-500">
          <h3 className="font-medium text-gray-900 mb-3 hover:text-orange-600 transition-colors duration-300">Why Adopt?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2 hover:text-gray-800 transition-colors duration-300 hover:scale-105">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow"></span>
              Save a life
            </p>
            <p className="flex items-center gap-2 hover:text-gray-800 transition-colors duration-300 hover:scale-105">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow animate-delay-100"></span>
              Pre-screened pets
            </p>
            <p className="flex items-center gap-2 hover:text-gray-800 transition-colors duration-300 hover:scale-105">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow animate-delay-200"></span>
              Support local shelters
            </p>
            <p className="flex items-center gap-2 hover:text-gray-800 transition-colors duration-300 hover:scale-105">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow animate-delay-300"></span>
              Lifetime support
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}